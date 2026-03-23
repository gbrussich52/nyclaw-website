# Twitter Thread: AI Agent Silent Failure

---

**Tweet 1 (hook)**
My AI agent stopped responding on Discord today.

Not crashed. Not erroring. Just typing for 2 minutes and going silent.

Spent hours debugging. Turned out to be 3 separate problems stacked on each other.

Here's the SOP so you don't waste a day on this: 🧵

---

**Tweet 2**
First instinct: "must be an API rate limit"

Logs showed: "No available auth profile. All models failed."

Not a rate limit. My credentials were gone.

An automated maintenance command wiped them at 1am. Config still showed the profile. Token: vanished.

---

**Tweet 3**
This is the sneaky one.

Your gateway can be running perfectly. Your config can look exactly right. But if the actual auth file is empty, every API call fails silently and your agent just... swallows it.

No error to the user. No alert. Just silence.

---

**Tweet 4**
Fix #1: Re-add your credentials.

More importantly — store tokens as env vars, not plaintext in credential files.

Maintenance commands and config rewrites can silently wipe credential files.

An env var reference survives those wipes:
"token": "${YOUR_OAUTH_TOKEN}"

---

**Tweet 5**
OK credentials restored. Restarted the gateway.

Still hanging.

Back to the logs. Found this firing on every single message:
```
Compaction safeguard: new content uses 183% of context
Dropped 841 messages to fit history budget
AbortError: Unsubscribed during compaction
```

---

**Tweet 6**
The session file for my Discord channel was 11MB.

Session registry showed 0 messages. But the file on disk had all the history — hundreds of thousands of tokens loaded on every message.

It was aborting during compaction before a single API call went out.

---

**Tweet 7**
This is why your agent can look fine from the outside and be completely broken.

Typing indicator fires ✓
Bot is connected ✓
Gateway is running ✓

But 3 layers down it's already dead before the API call ever goes out.

---

**Tweet 8**
Fix #2: Check your actual session files on disk.

```bash
ls -lh /path/to/sessions/*.jsonl | sort -k5 -rh
```

Anything over a few hundred KB for a chat session is suspicious.
Over 1MB is a problem.

Truncate it, restart the gateway, done.

---

**Tweet 9**
Fix #3: Prevent it from happening again.

Set up a daily cron to reset the session at 3am. This:
- Triggers your session-memory hook (saves context to long-term memory)
- Starts a fresh session before it can balloon
- Runs on Haiku so it's basically free

---

**Tweet 10**
Debugging order when your agent goes silent:

1. Check error logs for auth/cooldown errors
2. Check session file sizes on disk
3. Restart gateway to clear cooldown state
4. Tail live logs and send a test message
5. No API call fires within seconds → back to step 1

---

**Tweet 11**
The meta-lesson:

Silent failures in AI agents are brutal. Everything looks fine.

Don't assume rate limits. They show up in logs.

Real silent failures are almost always:
- Missing credentials
- Session bloat killing context
- Cooldown state that never cleared

---

**Tweet 12 (close)**
Spent way too long on this.

Now it's documented.

If your Discord bot / AI agent is typing but never responding — this thread is your starting point.

Save it. You'll need it eventually.

---
