"use client";
import { useState, createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

const ComingSoonContext = createContext();

export function useComingSoon() {
  return useContext(ComingSoonContext);
}

export default function ComingSoonProvider({ children }) {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowComingSoon(false);
  }, [pathname]);

  return (
    <ComingSoonContext.Provider value={{ showComingSoon, setShowComingSoon }}>
      {showComingSoon && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50"
          onClick={() => setShowComingSoon(false)}
        >
          <span className="text-3xl font-bold text-black px-8 py-6 rounded-lg shadow-lg bg-transparent">
            Coming soon
          </span>
        </div>
      )}
      {children}
    </ComingSoonContext.Provider>
  );
}