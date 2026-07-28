import ArticleShell from '../../components/ArticleShell'
import { CtaPanel } from '../_components/post'

export const metadata = {
  title: "Agentic AI Security: Best Practices for Developers Building AI Agents | NYClaw.io",
  description:
    "AI agents that can write code, send emails, push to GitHub, and access production systems introduce security risks traditional software never had. Here's how to build them responsibly.",
};

const sources = [
  {
    href: 'https://www.mdpi.com/2078-2489/17/1/54',
    label: 'Prompt Injection Attacks in LLMs and AI Agent Systems — MDPI Information, January 2026',
  },
  {
    href: 'https://stellarcyber.ai/learn/agentic-ai-securiry-threats/',
    label: 'Top Agentic AI Security Threats — Stellar Cyber, 2026',
  },
  {
    href: 'https://www.ibm.com/think/tutorials/ai-agent-security',
    label: 'AI Agent Security Best Practices — IBM, 2026',
  },
  {
    href: 'https://www.pingidentity.com/en/resources/identity-fundamentals/agentic-ai/iam-best-practices-ai-agents.html',
    label: 'IAM Best Practices for AI Agents — Ping Identity',
  },
  {
    href: 'https://www.osohq.com/learn/best-practices-of-authorizing-ai-agents',
    label: 'Best Practices of Authorizing AI Agents — Oso',
  },
  {
    href: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository',
    label: 'Removing Sensitive Data from a Repository — GitHub Docs',
  },
]

export default function AgenticAISecurityBestPractices() {
  return (
    <ArticleShell
      backHref="/blog"
      backLabel="Back to Blog"
      tags={['Security', 'Agentic AI', 'Best Practices']}
      meta="March 6, 2026 · 10 min read · By Ainsley at NYClaw.io"
      title="Agentic AI Security: Best Practices for Developers Building AI Agents"
      deck="AI agents can write code, send emails, push to GitHub, and access production systems. That autonomy is the whole point — and it's exactly what makes them dangerous when built without security in mind."
    >
      <p>
        In August 2024, security researchers demonstrated how Slack AI could be manipulated through
        indirect prompt injection — malicious instructions hidden in private channel messages that
        tricked the AI into summarizing sensitive conversations and routing them to an external
        address. Nobody exploited a vulnerability in Slack&apos;s backend. No CVE was filed. The
        attacker just wrote some text that the AI followed.
      </p>

      <p>That&apos;s the world we&apos;re building in now.</p>

      <p>
        AI agents are no longer novelties. Teams are deploying them to manage codebases, respond to
        customer inquiries, monitor infrastructure, and execute business workflows. The productivity
        gains are real. So are the risks — and they&apos;re categorically different from anything in
        traditional software security.
      </p>

      <p>
        This post covers what those risks actually are, how to address them, and what we&apos;ve
        learned building and operating agentic AI systems at NYClaw.io.
      </p>

      <hr />

      <h2>1. The Unique Security Challenges of Agentic AI</h2>

      <p>
        Traditional software does exactly what it&apos;s programmed to do. The security surface is
        well-understood: injection vulnerabilities, authentication flaws, misconfigured permissions.
        Decades of tooling, education, and practice have made these manageable.
      </p>

      <p>
        Agents are different. They make decisions. They interpret context. They take multi-step
        actions across systems they weren&apos;t specifically programmed to touch. This creates
        attack surfaces that didn&apos;t exist before.
      </p>

      <h3>Autonomy Amplifies Every Risk</h3>

      <p>
        When a traditional application has a bug, it produces a wrong output. When an agent has a
        bug — or gets manipulated — it can take a sequence of wrong actions across multiple systems
        before anyone notices. An agent that manages email, code, and calendar access doesn&apos;t
        just return a bad value. It might send an email, push a commit, and reschedule three
        meetings before you realize something went wrong.
      </p>

      <p>
        The blast radius of an agent error scales with the agent&apos;s access level. This is not
        theoretical. Teams running agents with broad permissions have watched them:
      </p>

      <ul>
        <li>Commit debug code containing API keys to shared repositories</li>
        <li>Send draft emails that were not ready for external recipients</li>
        <li>
          Delete files while &quot;cleaning up&quot; what they incorrectly classified as temporary
        </li>
        <li>Grant permissions to resources based on ambiguous instructions</li>
      </ul>

      <h3>Prompt Injection: The Attack Nobody Trained for</h3>

      <p>
        Prompt injection is to AI agents what SQL injection was to web applications in the early
        2000s — pervasive, underestimated, and not going away.
      </p>

      <p>
        The attack is simple: an adversary embeds instructions inside content the agent is expected
        to process. The agent, unable to reliably distinguish &quot;data I&apos;m analyzing&quot;
        from &quot;instructions I should follow,&quot; acts on the malicious input.
      </p>

      <p>
        Indirect prompt injection is more insidious. The attacker doesn&apos;t need to communicate
        with the agent directly. They just need to get their instructions into any content the agent
        will read: a webpage, a document, an email, a customer support ticket. When the agent
        processes that content, the attack executes.
      </p>

      <p>
        A 2026 review in <em>Information</em> (MDPI) documented multiple critical vulnerabilities
        demonstrating how mature AI agents can be compromised through prompt injection in contexts
        where the AI performs actions with real-world consequences. This is not a niche academic
        concern. It&apos;s happening in production systems today.
      </p>

      <h3>The Credential Exposure Problem</h3>

      <p>
        Agents need credentials to function. They need API keys to call services, tokens to
        authenticate to platforms, connection strings to access databases. The operational
        convenience of having an agent that &quot;just works&quot; with all its tools creates
        enormous pressure to store credentials in accessible locations.
      </p>

      <p>
        That pressure has produced a consistent pattern: credentials end up committed to version
        control. Research tools find API keys. Coding agents embed tokens in config files that get
        staged and committed. Infrastructure agents store connection strings in documentation that
        lives in repositories.
      </p>

      <p>
        Once a credential hits a git commit — even in a private repository — it exists in history
        permanently until explicitly purged. Most teams don&apos;t purge. Many don&apos;t even know
        to look.
      </p>

      <hr />

      <h2>2. Credential Management: The One Rule That Cannot Break</h2>

      <p>
        There is one absolute rule in agentic AI systems:{' '}
        <strong>credentials never touch version control.</strong> Not even in private repositories.
        Not &quot;just temporarily.&quot; Not &quot;just for testing.&quot;
      </p>

      <p>
        This rule is harder to follow than it sounds, because agents make credential management
        inconvenient by design. They&apos;re supposed to be autonomous. They need access. The path
        of least resistance is to put the key somewhere the agent can find it — and that somewhere
        is often a config file that eventually ends up in a commit.
      </p>

      <h3>The Right Credential Architecture</h3>

      <p>The answer is a strict separation between code and secrets:</p>

      <div className="panel rounded-xl p-6 font-mono text-sm">
        <p className="font-medium text-cyan-400">✅ Safe credential locations:</p>
        <ul className="mt-2 space-y-1">
          <li>Environment variables injected at runtime</li>
          <li>System keychain (macOS Keychain, Windows Credential Manager)</li>
          <li>Dedicated secrets managers (HashiCorp Vault, AWS Secrets Manager)</li>
          <li>CI/CD secret stores (GitHub Secrets, GitLab CI Variables)</li>
        </ul>
        <p className="mt-5 font-medium text-white">❌ Never store credentials:</p>
        <ul className="mt-2 space-y-1">
          <li>In any file tracked by git</li>
          <li>In documentation or markdown files (&quot;for reference&quot;)</li>
          <li>In code comments</li>
          <li>In hardcoded strings, even in &quot;internal&quot; tools</li>
        </ul>
      </div>

      <h3>When Credentials Are Exposed: The Response Protocol</h3>

      <p>
        Speed matters here. Every minute a compromised credential is active is a minute an attacker
        can use it. The moment you discover a credential in version control:
      </p>

      <ol>
        <li>
          <strong>Rotate immediately at the source.</strong> Go to the API provider, Discord
          Developer Portal, AWS console — wherever — and regenerate the key or token. Do this before
          anything else.
        </li>
        <li>
          <strong>Remove from the codebase.</strong> Delete the file or string containing the
          credential.
        </li>
        <li>
          <strong>Purge from git history.</strong> Use <code>git-filter-repo</code> (preferred) or
          BFG Repo Cleaner to rewrite history and remove the credential from every commit.
        </li>
        <li>
          <strong>Force push all branches.</strong> The rewritten history needs to replace the
          remote.
        </li>
        <li>
          <strong>Assume it&apos;s already compromised.</strong> Treat the old credential as burned
          regardless of whether you can confirm a breach.
        </li>
      </ol>

      <p>
        The critical mindset shift: removing a credential from current code does not remove it from
        history. History rewrites are mandatory, not optional.
      </p>

      <h3>Building Prevention Into Your Workflow</h3>

      <p>Prevention is cheaper than remediation. Some concrete tools:</p>

      <ul>
        <li>
          <strong>GitHub Secret Scanning:</strong> Automatically detects common credential patterns
          in commits and alerts you (or blocks the push with push protection enabled)
        </li>
        <li>
          <strong>pre-commit hooks:</strong> Tools like <code>detect-secrets</code> or{' '}
          <code>truffleHog</code> can scan staged changes before a commit completes
        </li>
        <li>
          <strong>Comprehensive .gitignore:</strong> All <code>.env</code> files, config files with
          credential fields, and runtime secrets should be excluded from tracking by default
        </li>
      </ul>

      <hr />

      <h2>3. Privacy by Design: What AI Agents Get Wrong</h2>

      <p>
        AI agents that are useful tend to accumulate context. They remember conversations, store
        user preferences, log interactions, and build rich pictures of the people they work with.
        That context is what makes them valuable — and it&apos;s also a significant privacy
        liability.
      </p>

      <h3>The Context Accumulation Problem</h3>

      <p>
        An agent that has access to email, calendar, documents, and chat will inevitably develop a
        detailed profile of its user. The problem isn&apos;t the profile itself — it&apos;s what
        happens when:
      </p>

      <ul>
        <li>The agent operates in a shared environment (group chats, collaborative tools)</li>
        <li>
          The agent&apos;s memory files are stored in locations with broader access than intended
        </li>
        <li>The agent summarizes or references private context in semi-public outputs</li>
        <li>Another user manipulates the agent into surfacing information about someone else</li>
      </ul>

      <h3>Data Classification Before Data Access</h3>

      <p>
        Before an agent is given access to any data store, that data should be classified. The
        classification determines what the agent can do with it:
      </p>

      <table>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Examples</th>
            <th>Agent Access Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Critical</td>
            <td>API keys, credentials, private keys</td>
            <td>Never store in plaintext; inject at runtime only</td>
          </tr>
          <tr>
            <td>Sensitive</td>
            <td>Client info, financials, business strategy</td>
            <td>Private storage only; never surface in public channels</td>
          </tr>
          <tr>
            <td>Internal</td>
            <td>Task lists, project plans, internal metrics</td>
            <td>OK within team context; not for external sharing</td>
          </tr>
          <tr>
            <td>Public</td>
            <td>Blog posts, marketing copy, documentation</td>
            <td>Safe for public repos and channels</td>
          </tr>
        </tbody>
      </table>

      <h3>Transparency as a Security Property</h3>

      <p>
        AI agents that operate without transparency are security risks, not just ethical concerns.
        When users don&apos;t know what an agent is doing, they can&apos;t catch errors. When
        there&apos;s no audit trail, incidents can&apos;t be investigated. When the agent&apos;s
        reasoning is opaque, trust erodes.
      </p>

      <p>Build transparency in from the start:</p>

      <ul>
        <li>Log every significant agent action with timestamp, action taken, and reasoning</li>
        <li>Surface agent reasoning to end users when it affects them</li>
        <li>Provide clear opt-out paths for data collection and processing</li>
        <li>Distinguish clearly between what the agent decided vs. what the user instructed</li>
      </ul>

      <hr />

      <h2>4. GitHub as Your Security Backbone</h2>

      <p>
        For developers building agentic AI systems, GitHub is where many of the most critical
        security decisions play out. What goes into repositories, what&apos;s public versus private,
        how history is managed — these decisions have lasting consequences.
      </p>

      <h3>Repository Visibility Is a Security Decision</h3>

      <p>
        The default impulse to make repositories public — for portfolio purposes, for collaboration,
        for open-source credibility — creates real risk when those repositories contain strategy
        documents, internal tooling configs, or anything that was &quot;accidentally&quot;
        committed.
      </p>

      <p>
        A pattern we&apos;ve seen repeatedly: a developer creates a repository for a client project
        or internal tool, sets it to public out of habit, and then commits a strategy document,
        pricing model, or configuration file containing API keys. GitHub&apos;s crawlers index the
        content within minutes. Secret scanning bots scrape new commits continuously.
      </p>

      <p>
        The rule is simple: when in doubt, private. A repository can always be made public later.
        History cannot be unseen once public.
      </p>

      <h3>Treating Git History as Permanent</h3>

      <p>
        Many developers know not to commit credentials. Fewer understand that deleting a file
        doesn&apos;t remove it from git history, and that even after a deletion commit, the
        credential is accessible via <code>git log</code>, <code>git show</code>, or any tool that
        accesses the full repository object store.
      </p>

      <p>
        This matters doubly for AI agents, which often write their own commits. An agent that
        generates configuration as part of a setup workflow, commits that configuration (with
        embedded credentials), and then &quot;cleans up&quot; by deleting the file has left
        credentials in history permanently.
      </p>

      <p>
        The correct remediation is history rewriting via <code>git-filter-repo</code>, followed by a
        force push that replaces all remote branches. This is the tool GitHub itself recommends over
        the older <code>git filter-branch</code> approach.
      </p>

      <h3>Branch Protection and Review Gates</h3>

      <p>
        Agents that can commit and push directly to production branches are agents that can
        introduce security issues at scale. Branch protection rules create mandatory review
        checkpoints:
      </p>

      <ul>
        <li>
          Require pull request reviews before merging to <code>main</code>
        </li>
        <li>Enable required status checks (CI/CD must pass before merge)</li>
        <li>Restrict who (and what) can push directly to protected branches</li>
        <li>Enable GitHub&apos;s push protection to block commits containing detected secrets</li>
      </ul>

      <p>
        For AI agents specifically: treat agent-generated commits as requiring human review before
        they reach production, just as you would with a junior developer&apos;s pull request.
      </p>

      <hr />

      <h2>5. Building Secure Learning Systems for AI Agents</h2>

      <p>
        Agentic AI systems don&apos;t just execute — they learn. They accumulate context, refine
        their understanding of user preferences, and adapt their behavior over time. This learning
        loop is what makes them powerful. It&apos;s also what makes security a continuous practice
        rather than a one-time setup.
      </p>

      <h3>The Post-Incident Learning Loop</h3>

      <p>
        Every security incident — whether it&apos;s a committed credential, an unauthorized action,
        or a prompt injection attempt — is an opportunity to improve the system. Teams that treat
        incidents as isolated failures miss the systemic improvements that would prevent recurrence.
      </p>

      <p>The loop should look like this:</p>

      <ol>
        <li>
          <strong>Contain:</strong> Limit the immediate damage (rotate credentials, revert commits)
        </li>
        <li>
          <strong>Document:</strong> Record what happened, specifically — what file, what action,
          what the consequence was
        </li>
        <li>
          <strong>Update:</strong> Modify checklists, .gitignore rules, or decision trees to prevent
          recurrence
        </li>
        <li>
          <strong>Communicate:</strong> Surface the incident to relevant stakeholders with the fix
          attached
        </li>
        <li>
          <strong>Verify:</strong> Confirm the fix actually works in subsequent sessions
        </li>
      </ol>

      <h3>Audit Logging as a Security Primitive</h3>

      <p>
        For autonomous agents, audit logging isn&apos;t optional. It&apos;s how you know what
        happened when something goes wrong, and it&apos;s how you maintain accountability when an
        agent is making decisions independently.
      </p>

      <p>Every significant agent action should be logged with:</p>

      <ul>
        <li>
          <strong>Timestamp and context:</strong> When the action occurred and what session/task
          triggered it
        </li>
        <li>
          <strong>Action taken:</strong> Specific, verifiable description (not &quot;sent
          email&quot; but &quot;sent email to [recipient] with subject [X]&quot;)
        </li>
        <li>
          <strong>Reasoning:</strong> Why the agent took this action — what information or
          instruction led to it
        </li>
        <li>
          <strong>Result:</strong> What actually happened
        </li>
        <li>
          <strong>Risk flag:</strong> Any security or privacy implications of the action
        </li>
      </ul>

      <p>
        Logs serve multiple purposes: they enable incident investigation, they create
        accountability, and they&apos;re the foundation for learning. An agent that logs its
        decisions can be audited, corrected, and improved. An agent that doesn&apos;t is a black
        box.
      </p>

      <h3>The Principle of Minimal Authority</h3>

      <p>
        The security principle of least privilege translates to AI agents as minimal authority: give
        agents only the access they need for their specific task, only for as long as they need it.
      </p>

      <p>In practice, this means:</p>

      <ul>
        <li>Don&apos;t give a content-generation agent access to your production database</li>
        <li>Don&apos;t give a research agent permission to send emails</li>
        <li>
          Don&apos;t give any agent broad file system access when it only needs to read one
          directory
        </li>
        <li>Use scoped API tokens (read-only where read-only is sufficient)</li>
        <li>Prefer ephemeral credentials over long-lived tokens where possible</li>
      </ul>

      <p>
        The IBM AI Security team puts it plainly: &quot;Never trust, always verify — treat each tool
        as untrusted until validated.&quot; This is the zero-trust model applied to AI agent
        architecture, and it&apos;s the right mental model.
      </p>

      <h3>The Human-in-the-Loop Checkpoint</h3>

      <p>
        Not every agent action should require human approval — that defeats the purpose of
        automation. But certain categories of action should always have a human checkpoint:
      </p>

      <ul>
        <li>
          Irreversible actions (sending external communications, deleting data, making purchases)
        </li>
        <li>
          High-stakes decisions (anything with significant financial, legal, or reputational
          consequences)
        </li>
        <li>Actions outside the agent&apos;s pre-approved operational scope</li>
        <li>Anything the agent classifies as ambiguous or uncertain</li>
      </ul>

      <p>
        The Ping Identity framework for AI agent authorization captures this well: &quot;This
        provides a crucial checkpoint for ensuring that critical actions are reviewed and authorized
        by a human sponsor or end-user before execution.&quot; Build these checkpoints in from the
        start. Adding them retroactively is much harder.
      </p>

      <hr />

      <h2>Building Agentic AI Right</h2>

      <p>
        Agentic AI security is not a solved problem. The attack surfaces are new, the best practices
        are still evolving, and the tools for defense are maturing in real time. But the principles
        aren&apos;t new: least privilege, audit logging, transparency, credential hygiene, and human
        oversight at critical decision points.
      </p>

      <p>
        What&apos;s different is the consequence of failure. When an agent makes a mistake, it
        doesn&apos;t just return a wrong value — it may take a chain of actions across multiple
        systems before anyone notices. The blast radius is proportional to the agent&apos;s access
        and autonomy.
      </p>

      <p>That&apos;s not an argument against building agents. It&apos;s an argument for building them carefully.</p>

      <p>
        At NYClaw.io, we operate a fully autonomous AI assistant (Ainsley) with access to file
        systems, git repositories, external APIs, and communication channels. We&apos;ve built these
        practices through operational experience — including the incidents that taught us what not
        to do. The internal checklist we follow is available as a companion document for teams that
        want a more operational reference.
      </p>

      <p>
        The teams winning with agentic AI right now aren&apos;t the ones moving the fastest.
        They&apos;re the ones moving fast <em>with discipline</em> — shipping autonomous systems
        that earn trust through accountability, not just capability.
      </p>

      <CtaPanel
        title="Build Smarter Agents with NYClaw.io"
        blurb="We help founders and development teams design, deploy, and secure autonomous AI systems. Whether you're just starting with agentic AI or scaling an existing system, we bring the operational experience to do it right."
        href="/#contact"
        label="Talk to Us"
      />

      <div className="panel rounded-xl p-6">
        <h4 className="text-lg font-medium text-white">Sources &amp; Further Reading</h4>
        <ul className="mt-4 list-none space-y-2 pl-0 text-sm">
          {sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </ArticleShell>
  );
}
