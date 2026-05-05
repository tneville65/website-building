"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StressTestPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stress-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{ background: "linear-gradient(135deg, #0A1628 0%, #0D1F3C 100%)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo / brand */}
        <div className="text-center mb-10">
          <p className="text-[#C9A84C] text-xs uppercase tracking-[0.4em] mb-3 font-medium">The KeyArx Group</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            How to Stress Test<br />
            <span className="text-[#C9A84C]">Group LTD Plans</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            For Healthcare Professionals<br />
            <span className="text-gray-500">By Paul J. Cella, CLU, ChFC</span>
          </p>
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#C9A84C]/10 border border-[#C9A84C]/30 p-10 text-center"
            >
              <div className="text-[#C9A84C] text-4xl mb-5">✓</div>
              <h2 className="font-serif text-2xl font-bold text-white mb-3">Check your inbox</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your copy of the guide is on its way to <strong className="text-white">{email}</strong>. Check your inbox (and spam folder just in case).
              </p>
              <p className="text-gray-500 text-xs mt-6">
                Questions? Reach Paul directly at paul@keyarx.com
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 p-8 md:p-10"
            >
              <p className="text-gray-300 text-sm leading-relaxed mb-8 text-center">
                Enter your name and email to receive your free copy of the guide.
              </p>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Dr. Jane Smith"
                    className="w-full bg-white/8 border border-white/15 focus:border-[#C9A84C]/60 text-white px-4 py-3 outline-none transition-colors text-sm placeholder-gray-600"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Email Address</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full border border-white/15 focus:border-[#C9A84C]/60 text-white px-4 py-3 outline-none transition-colors text-sm placeholder-gray-600"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-xs mb-4 text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C9A84C] hover:bg-[#E2C47A] disabled:opacity-60 text-[#0A1628] font-bold py-4 uppercase tracking-widest text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]"
              >
                {loading ? "Sending..." : "Send Me the Guide →"}
              </button>

              <p className="text-gray-600 text-xs text-center mt-5 leading-relaxed">
                No spam. Your information is used only to deliver this guide and may be used by The KeyArx Group for follow-up.
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-center text-gray-600 text-xs mt-8">
          The KeyArx Group · paul@keyarx.com · (732) 983-9830
        </p>
      </div>
    </div>
  );
}
