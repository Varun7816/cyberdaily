export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">CyberTimes</h4>
          <p className="text-sm text-gray-300">
            Timely coverage of breaches, attacks and vulnerabilities. Curated incident reports and links to original sources.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Latest</h4>
          <ul className="text-sm space-y-2 text-gray-300">
            <li><a className="hover:text-white" href="/cyber-incidents">Cyber Incidents</a></li>
            <li><a className="hover:text-white" href="/cyber-incidents?subcategory=data-breaches">Vulnerabilities</a></li>
            <li><a className="hover:text-white" href="/cyber-incidents?subcategory=cyber-attacks">Zero-Day Exploits</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
          <ul className="text-sm space-y-2 text-gray-300">
            <li><a className="hover:text-white" href="/about">About</a></li>
            <li><a className="hover:text-white" href="/contact">Contact</a></li>
            <li><a className="hover:text-white" href="/privacy">Privacy</a></li>
            <li><a className="hover:text-white" href="/rss.xml">RSS</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Subscribe</h4>
          <p className="text-sm text-gray-300 mb-3">Get major incident alerts delivered to your inbox.</p>
          <form className="flex">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="flex-1 px-3 py-2 rounded-l-md text-sm bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md text-sm"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-4 flex items-center gap-3">
            <a href="https://twitter.com/" aria-label="Twitter" className="text-gray-300 hover:text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23 4.5c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.4 1.7-2.4-.8.5-1.7.9-2.7 1.1C18.8 3 17.4 2.5 16 2.5c-2.6 0-4.6 2.2-4.6 4.9 0 .4 0 .8.1 1.1C7.7 8.3 4.1 6.5 1.7 3.7c-.4.6-.6 1.4-.6 2.2 0 1.6.8 3 2 3.8-.6 0-1.1-.2-1.6-.4v.1c0 2.1 1.4 3.9 3.2 4.3-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.4 1.8 2.4 3.4 2.4-1.3 1-2.8 1.5-4.5 1.5-.3 0-.6 0-.8-.1 1.6 1.1 3.6 1.7 5.6 1.7 6.7 0 10.4-5.7 10.4-10.7v-.5c.7-.5 1.3-1.2 1.8-1.9-.7.3-1.4.5-2.2.6z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/" aria-label="LinkedIn" className="text-gray-300 hover:text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.879 3.87 6 2.5 6S0 4.879 0 3.5 1.11 1 2.5 1 4.98 2.121 4.98 3.5zM0 8h5v16H0zM8 8h4.8v2.3h.1c.7-1.2 2.5-2.3 4.9-2.3 5.2 0 6.2 3.4 6.2 7.8V24H19v-7.9c0-1.9 0-4.4-2.7-4.4-2.8 0-3.2 2.2-3.2 4.3V24H8z" />
              </svg>
            </a>
            <a href="/rss.xml" aria-label="RSS" className="text-gray-300 hover:text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.5 18.5A2.5 2.5 0 116 21a2.5 2.5 0 01-2.5-2.5zM3 10.5v3a8.5 8.5 0 018.5 8.5h3A11.5 11.5 0 003 10.5zM3 3v3a15.5 15.5 0 0115.5 15.5h3A18.5 18.5 0 003 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
          <div>© {new Date().getFullYear()} CyberIntel — All rights reserved.</div>
          <div className="mt-3 sm:mt-0 space-x-4">
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}