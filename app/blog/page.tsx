export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-sky-blue">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="block">
            <div className="text-2xl font-bold leading-none">
              <span className="text-navy">NY</span>
              <span className="text-sky-blue">C</span>
              <span className="text-sky-blue">law</span>
              <span className="text-dark-red">.</span>
              <span className="text-navy">io</span>
            </div>
            <div className="text-xs text-charcoal/60 font-medium tracking-wide mt-0.5">
              AI Automation Agency
            </div>
          </a>
          <a href="/" className="text-charcoal hover:text-sky-blue transition">← Back Home</a>
        </nav>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-navy mb-4">Blog & Resources</h1>
          <p className="text-lg text-charcoal mb-12">
            Learn how we build AI businesses, automate operations, and generate revenue with OpenClaw.
          </p>

          <div className="space-y-8">
            {/* Placeholder articles */}
            {[
              {
                title: "How to Set Up Your AI with OpenClaw",
                description: "Step-by-step guide to setting up an AI entrepreneur on your Mac, including initial configuration and first revenue tracking.",
                date: "Coming Soon"
              },
              {
                title: "Building an AI Influencer: The Sarah Case Study",
                description: "Everything we learned building Sarah - character design, UGC generation with Nano Banana, affiliate partnerships, and social media strategy.",
                date: "Coming Soon"
              },
              {
                title: "Affiliate Monetization: From Zero to First Sale",
                description: "How we monetized the Rumble Simulator with sports betting affiliates, including link optimization, testing, and revenue tracking.",
                date: "Coming Soon"
              },
              {
                title: "AI-Powered Marketing: UGC, Content, and Scaling",
                description: "The complete system for generating high-quality UGC, managing multiple social accounts, and optimizing affiliate revenue.",
                date: "Coming Soon"
              }
            ].map((article, i) => (
              <article key={i} className="card border-l-4 border-sky-blue">
                <h2 className="text-2xl font-bold text-navy mb-2">{article.title}</h2>
                <p className="text-sm text-sky-blue mb-4">📅 {article.date}</p>
                <p className="text-charcoal mb-4">{article.description}</p>
                <button className="text-sky-blue font-bold hover:text-dark-red transition">
                  Read Article →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-8 px-6 text-center">
        <p>&copy; 2026 NYClaw.io. Built by Ainsley & Giani.</p>
      </footer>
    </div>
  )
}
