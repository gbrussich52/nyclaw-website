import { type Contractor, type Evidence, validateCatalog } from './schema'

export const CATALOG_CHECKED_AT = '2026-10-20'
const tradeRegister = 'https://tradelicenses.westchestercountyny.gov/TradeLicenses/'
const homeRegister = 'https://consumerlicenseweb.westchestercountyny.gov/ConsumerLicenseWeb/'
function source(id: string, url: string, summary: string, jobs: Evidence['jobs'], testimonial = false): Evidence {
  return { id, url, summary, jobs, kind: testimonial ? 'business-selected-testimonial' : 'business-website', checkedAt: CATALOG_CHECKED_AT,
    publishedAt: null, rights: 'public-reference', permissionReference: null, originalSourceId: url }
}
function license(number: string | null, general = false): Contractor['license'] {
  return { number, authority: 'Westchester County', checkedAt: number ? CATALOG_CHECKED_AT : null,
    expiresAt: number ? '2026-12-31' : null, sourceUrl: general ? homeRegister : tradeRegister }
}

// Manually checked public business pages. Summaries are original, minimal paraphrases;
// no reviewer names, raw social posts, private groups, paid placement or copied ratings.
// The three electrical license numbers/expiry dates were observed in the county register.
export const contractors = validateCatalog([
  { id: 'ease-electrical', name: 'EASE Electrical Contracting', trade: 'electrician', areas: ['westchester'], propertyTypes: ['residential', 'multifamily'],
    website: 'https://www.easeelectricalcontracting.com/', license: license('2115'), evidence: [
      source('ease-services', 'https://www.easeelectricalcontracting.com/', 'The business lists panel upgrades, EV charger installations, lighting and residential electrical repairs in Westchester.', ['panel-upgrade', 'ev-charger', 'lighting-outlets']),
      source('ease-testimonial', 'https://www.easeelectricalcontracting.com/', 'A testimonial selected by the business describes an EV charging installation and positive communication. Its publication date and customer identity were not independently verified.', ['ev-charger'], true),
    ] },
  { id: 'keating-electric', name: 'Keating Electric & Technologies', trade: 'electrician', areas: ['westchester'], propertyTypes: ['residential', 'multifamily'],
    website: 'https://www.keatingelectric.com/', license: license('1668'), evidence: [
      source('keating-services', 'https://www.keatingelectric.com/', 'The business lists residential service upgrades, EV charging, outlets and lighting, with Westchester service coverage.', ['panel-upgrade', 'ev-charger', 'lighting-outlets']),
      source('keating-testimonial', 'https://www.keatingelectric.com/', 'The business publishes selected customer feedback about its electrical work and communication. This is not an independently verified review feed.', ['any'], true),
    ] },
  { id: 'fanning-electric', name: 'Fanning Electric Company', trade: 'electrician', areas: ['westchester'], propertyTypes: ['residential', 'multifamily'],
    website: 'https://www.fanningelectric.com/', license: license('217'), evidence: [
      source('fanning-services', 'https://www.fanningelectric.com/', 'The business describes residential electrical repairs and installations, plus generator work, in Westchester and Putnam.', ['lighting-outlets']),
      source('fanning-testimonial', 'https://www.fanningelectric.com/', 'Selected testimonials displayed by the business discuss electrical work and project experience. We have not verified the underlying reviewers or reproduced its star rating.', ['any'], true),
    ] },
  { id: 'bruni-campisi', name: 'Bruni & Campisi', trade: 'plumber', areas: ['westchester'], propertyTypes: ['residential'],
    website: 'https://www.bruniandcampisi.com/', license: license(null), evidence: [
      source('bruni-services', 'https://www.bruniandcampisi.com/plumbing-repair-and-installation/', 'The business lists home plumbing repairs, water heaters, drains and fixtures, with Westchester service coverage.', ['plumbing-repair', 'water-heater']),
    ] },
  { id: 'a-borrelli', name: 'A. Borrelli Mechanical', trade: 'plumber', areas: ['westchester'], propertyTypes: ['residential'],
    website: 'https://www.aborrelli.com/', license: license(null), evidence: [
      source('borrelli-services', 'https://www.aborrelli.com/residential/', 'Its residential service page lists plumbing fixtures, water heaters, drains and repairs across named Westchester communities.', ['plumbing-repair', 'water-heater']),
    ] },
  { id: 'bruckner-plumbing', name: 'Bruckner Plumbing', trade: 'plumber', areas: ['westchester', 'nyc'], propertyTypes: ['multifamily'],
    website: 'https://www.brucknerplumbing.com/', license: license(null), evidence: [
      source('bruckner-services', 'https://www.brucknerplumbing.com/', 'The business serves apartment management companies in NYC and Westchester; its listed work includes leak repairs, kitchen/bath plumbing and water heaters. Ask whether it accepts your property type.', ['plumbing-repair', 'water-heater', 'kitchen-bath']),
    ] },
  { id: 'westchester-general', name: 'Westchester General Contracting & Home Maintenance', trade: 'general-contractor', areas: ['westchester'], propertyTypes: ['residential'],
    website: 'https://www.wgchm.com/', license: license(null, true), evidence: [
      source('wgc-services', 'https://www.wgchm.com/', 'The business describes home renovation, kitchen/bath work, painting and repairs, based in New Rochelle.', ['renovation', 'kitchen-bath']),
      source('wgc-testimonial', 'https://www.wgchm.com/', 'A business-selected testimonial describes bathroom, kitchen and deck projects. Publication date and customer identity are not independently verified.', ['kitchen-bath', 'renovation'], true),
    ] },
  { id: 'twf-contracting', name: 'TWF Contracting', trade: 'general-contractor', areas: ['westchester'], propertyTypes: ['residential', 'multifamily'],
    website: 'https://www.twfcontracting.com/', license: license(null, true), evidence: [
      source('twf-services', 'https://www.twfcontracting.com/', 'The business describes remodeling and construction work from Port Chester, and lists Westchester and NYC among its service jurisdictions.', ['renovation', 'kitchen-bath']),
      source('twf-testimonial', 'https://www.twfcontracting.com/', 'The business displays selected feedback about a home remodel. This does not establish an independent recommendation or current availability.', ['renovation'], true),
    ] },
  { id: 'wk-general', name: 'W&K General Contractor', trade: 'general-contractor', areas: ['westchester'], propertyTypes: ['residential'],
    website: 'https://www.wkgeneralcontractor.com/', license: license(null, true), evidence: [
      source('wk-services', 'https://www.wkgeneralcontractor.com/', 'The business lists home renovation, kitchen remodeling and repairs in Westchester and Putnam.', ['renovation', 'kitchen-bath']),
    ] },
])
