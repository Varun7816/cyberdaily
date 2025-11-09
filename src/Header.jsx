import React from "react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Cyber Crime News", href: "#" },
  { name: "Vulnerabilities", href: "#" },
  { name: "Zero Days", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Events", href: "#" },
  { name: "Learning", href: "#" },
];

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-3">
          <span className="w-10 h-10 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
            CT
          </span>
          <span className="text-3xl font-extrabold text-gray-900 tracking-tight font-merriweather">
            CyberTimes
          </span>
        </div>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button (optional) */}
        </div>
      </div>
    </header>
  );
}
