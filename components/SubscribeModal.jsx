"use client";
import { useState } from "react";

export default function SubscribeModal({ open, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
      onClose();
    }, 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm relative">
        <button className="absolute top-2 right-4 text-gray-400" onClick={onClose}>✕</button>
        <h2 className="text-xl font-bold mb-4">Subscribe for Updates</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold text-center">Thank you for subscribing!</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded mb-4"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}