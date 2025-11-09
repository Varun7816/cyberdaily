"use client";
import { usePathname } from "next/navigation";

export default function Navbar() {
  usePathname(); // keep hook to avoid unused-import warnings

  // Minimal empty navbar — no labels/links shown
  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-10 py-4" />
    </nav>
  );
}