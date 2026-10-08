# classification: PUBLIC
import datetime as dt
import importlib.util
import json
from pathlib import Path
import unittest
spec = importlib.util.spec_from_file_location('counter', Path(__file__).parents[1] / 'request-counts.py')
counter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(counter)
NOW = dt.datetime(2026,10,8,tzinfo=dt.timezone.utc)
def record(**extra):
    return json.dumps({'timestamp':'2026-10-07T00:00:00Z','email':'fictional@example.com','message':'PRIVATE SENTINEL',**extra})
def batch(*rows):
    return [{'result':len(rows)},{'result':list(rows)}]
class RequestCountsTest(unittest.TestCase):
    def test_zero_is_valid_only_after_confirmed_empty_read(self):
        result=counter.aggregate(batch(),now=NOW)
        self.assertEqual(result['counts'],{'guide_requests':0,'other_contact_submissions':0})
        for value in (None,[],[{'error':'offline'}, {'result':[]}], [{'result':1},{'result':[]}]):
            with self.assertRaises(counter.MeasurementError):counter.aggregate(value,now=NOW)
    def test_bounded_counts_no_personal_data_or_dynamic_labels(self):
        result=counter.aggregate(batch(record(challenge='guide-download',source='resource_form'),record(source='private-email@example.com')),now=NOW)
        self.assertEqual(result['by_form_source']['resource_form'],1)
        self.assertEqual(result['by_form_source']['unknown'],1)
        encoded=json.dumps(result)
        for secret in ('fictional@example.com','PRIVATE SENTINEL','private-email@example.com'):
            self.assertNotIn(secret,encoded)
    def test_old_records_outside_window_are_not_recent(self):
        result=counter.aggregate(batch(record(timestamp='2026-09-01T00:00:00Z')),now=NOW)
        self.assertEqual(sum(result['counts'].values()),0)
    def test_bad_record_does_not_turn_into_zero(self):
        for value in ('invalid',record(timestamp='bad'),record(timestamp='2026-10-08'),record(timestamp='2026-11-01T00:00:00Z')):
            with self.assertRaises(counter.MeasurementError):counter.aggregate(batch(value),now=NOW)
    def test_window_at_storage_cap_fails_instead_of_claiming_complete(self):
        with self.assertRaisesRegex(counter.MeasurementError,'WINDOW_MAY_BE_TRUNCATED'):
            counter.aggregate(batch(*([record()]*counter.CAP)),now=NOW)
    def test_invalid_window(self):
        for value in (0,91,True):
            with self.assertRaises(counter.MeasurementError):counter.aggregate(batch(),days=value,now=NOW)
if __name__=='__main__':unittest.main()
