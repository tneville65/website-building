"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const benefits = [
  { icon: "📊", title: "Exclusive Deal Access", desc: "View and invest in private market opportunities not available to the general public." },
  { icon: "🔍", title: "Due Diligence Reports", desc: "Full investment memos, financials, and committee assessments for every deal." },
  { icon: "🤝", title: "Co-Investment Rights", desc: "Invest alongside institutional partners and other accredited members." },
  { icon: "📚", title: "Member Education", desc: "Private market investing masterclasses, webinars, and one-on-one sessions." },
  { icon: "🌐", title: "Network Access", desc: "Connect with physician investors, founders, and executives across the medical ecosystem." },
  { icon: "🔔", title: "Early Notifications", desc: "First access to new deals before they open to the broader member base." },
];

export default function Membership() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", specialty: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-b from-[#060E1A] to-[#0A1628]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-6">Membership</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-serif text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Apply for<br /><span className="text-[#C9A84C]">Access.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="text-gray-400 text-lg leading-relaxed">
            LeagueMed membership is selective. We review every application personally. Membership is open to board-certified physicians, medical professionals, and accredited investors with a genuine interest in private market opportunities.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-[#060E1A]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-4">What You Receive</p>
              <h2 className="font-serif text-4xl font-bold">Member Benefits</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <motion.div key={b.title} variants={fadeUp} whileHover={{ y: -4 }} className="bg-[#0D1F3C] border border-[#C9A84C]/10 p-8 transition-all duration-300">
                  <div className="text-2xl mb-4">{b.icon}</div>
                  <h3 className="font-serif text-xl font-bold mb-3">{b.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-[#0A1628]">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] mb-4">Apply Now</p>
              <h2 className="font-serif text-4xl font-bold mb-4">Request Access</h2>
              <p className="text-gray-400">All applications are reviewed within 5 business days. Membership is granted at our sole discretion.</p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0D1F3C] border border-[#C9A84C]/30 p-12 text-center"
              >
                <div className="text-[#C9A84C] text-4xl mb-6">✓</div>
                <h3 className="font-serif text-2xl font-bold mb-4">Application Received</h3>
                <p className="text-gray-400">Thank you for applying to LeagueMed. We will review your application and respond within 5 business days.</p>
              </motion.div>
            ) : (
              <motion.form variants={fadeUp} onSubmit={handleSubmit} className="bg-[#0D1F3C] border border-[#C9A84C]/10 p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#0A1628] border border-white/10 focus:border-[#C9A84C]/50 text-white px-4 py-3 outline-none transition-colors text-sm"
                      placeholder="Dr. Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#0A1628] border border-white/10 focus:border-[#C9A84C]/50 text-white px-4 py-3 outline-none transition-colors text-sm"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Specialty / Role *</label>
                  <select
                    required
                    value={form.specialty}
                    onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                    className="w-full bg-[#0A1628] border border-white/10 focus:border-[#C9A84C]/50 text-white px-4 py-3 outline-none transition-colors text-sm appearance-none"
                  >
                    <option value="">Select your specialty or role</option>
                    <option>Physician — Primary Care</option>
                    <option>Physician — Surgery</option>
                    <option>Physician — Cardiology</option>
                    <option>Physician — Orthopedics</option>
                    <option>Physician — Neurology</option>
                    <option>Physician — Radiology</option>
                    <option>Physician — Anesthesiology</option>
                    <option>Physician — Other Specialty</option>
                    <option>Dentist / Oral Surgeon</option>
                    <option>Healthcare Executive</option>
                    <option>Medical Entrepreneur / Founder</option>
                    <option>Accredited Investor (Medical Industry)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-gray-400 block mb-2">Why LeagueMed? (Optional)</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-[#0A1628] border border-white/10 focus:border-[#C9A84C]/50 text-white px-4 py-3 outline-none transition-colors text-sm resize-none"
                    placeholder="Tell us about your interest in private market investing in medicine..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C9A84C] hover:bg-[#E2C47A] text-[#0A1628] font-semibold py-4 uppercase tracking-widest text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                >
                  Submit Application
                </button>
                <p className="text-gray-600 text-xs text-center">
                  By submitting, you confirm you are an accredited investor or qualified purchaser as defined by SEC regulations. Investment opportunities are not suitable for all investors.
                </p>
              </motion.form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
