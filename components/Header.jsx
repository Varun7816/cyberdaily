"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Mail } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/Home" },
    { name: "Cyber Incidents", href: "/cyber-incidents" },
    { name: "Vulnerabilities", href: "/vulnerabilities" },
    { name: "Zero-Days / Exploits", href: "/zero-days" },
    { name: "Jobs", href: "/jobs" },
    { name: "Events", href: "/events" },
    { name: "Resources", href: "/resources" },
];

export default function Header() {
    const router = useRouter();
    const pathname = usePathname() || "/";
    const [showSubscribe, setShowSubscribe] = React.useState(false);
    const [subscribeEmail, setSubscribeEmail] = React.useState("");

    // Coming soon modal state
    const [showComingSoon, setShowComingSoon] = React.useState(false);
    const [comingSoonFor, setComingSoonFor] = React.useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`Successfully subscribed with: ${subscribeEmail}`);
        setShowSubscribe(false);
    };

    const markComingSoonSeen = (name) => {
        try {
            sessionStorage.setItem("comingSoonSeen", "1");
            sessionStorage.setItem("comingSoonLast", name);
        } catch (err) {
            /* ignore for SSR */
        }
    };

    // Events/Resources: show modal in-place (no navigation)
    const handleEventResourceClick = (e, linkName) => {
        e && e.preventDefault();
        markComingSoonSeen(linkName);
        setComingSoonFor(linkName);
        setShowComingSoon(true);
    };

    // Normal navigation for all links (Jobs will no longer be intercepted)
    const handleNavClick = (e, link) => {
        e && e.preventDefault();
        router.push(link.href);
    };

    const isActive = (href) => {
        if (!href) return false;
        // normalize and compare
        const normalize = (p) => String(p || "").replace(/\/+$/, "").toLowerCase();
        return normalize(pathname).startsWith(normalize(href));
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-teal-400 text-white flex items-center justify-center font-bold text-lg shadow">
                        CT
                    </span>
                    <div>
                        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">CyberTimes</div>
                        <div className="text-xs text-gray-500 -mt-0.5">Incidents • Threats • Research</div>
                    </div>
                </div>

                <span
                    className="flex items-center gap-2 bg-blue-600 text-white font-semibold cursor-pointer px-4 py-2 rounded-lg shadow ml-auto transition hover:bg-blue-700"
                    onClick={() => setShowSubscribe(true)}
                >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm hidden sm:inline">Subscribe — Get latest news</span>
                </span>
            </div>

            {/* enhanced sub-nav */}
            <nav className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-start gap-3 py-3 overflow-x-auto">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            // special behavior for Events/Resources
                            if (link.name === "Events" || link.name === "Resources") {
                                return (
                                    <button
                                        key={link.name}
                                        onClick={(e) => handleEventResourceClick(e, link.name)}
                                        className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all whitespace-nowrap
                                             ${active ? "bg-gradient-to-r from-blue-600 to-teal-400 text-white shadow" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                                        aria-label={`${link.name} (coming soon)`}
                                    >
                                        <span>{link.name}</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-800 font-semibold">Soon</span>
                                    </button>
                                );
                            }

                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link)}
                                    className={`text-sm font-semibold px-4 py-2 rounded-full transition-all whitespace-nowrap
                                         ${active ? "bg-gradient-to-r from-blue-600 to-teal-400 text-white shadow" : "text-gray-700 hover:bg-gray-100"}`}
                                    aria-current={active ? "page" : undefined}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {showSubscribe && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
                    <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Subscribe to CyberTimes</h3>
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                value={subscribeEmail}
                                onChange={(e) => setSubscribeEmail(e.target.value)}
                                required
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowSubscribe(false)}
                                    className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Coming Soon Modal */}
            {showComingSoon && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[110]"
                    onClick={() => setShowComingSoon(false)}
                >
                    <div
                        className="bg-white rounded-xl p-6 shadow-2xl max-w-sm w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-bold mb-2 text-gray-900">{comingSoonFor} — Coming Soon</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            This section is coming soon. We'll notify you when {comingSoonFor.toLowerCase()} is available.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowComingSoon(false)}
                                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}