import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#060E1A] border-t border-[#C9A84C]/15 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="font-serif text-2xl font-bold mb-4">
              <span className="text-white">League</span>
              <span className="text-[#C9A84C]">Med</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              An exclusive private investment community for physicians and medical professionals. Access curated deals in medical arts, sciences, and technology.
            </p>
          </div>
          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A84C] mb-4">Community</h4>
            <ul className="space-y-3">
              {["About", "Membership", "Investment Opportunities", "Leadership"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C9A84C] mb-4">Legal</h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Disclosure", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-[#C9A84C]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2026 LeagueMed. All rights reserved. Investment opportunities are available to accredited investors only.</p>
          <p className="text-gray-600 text-xs">Membership by invitation only.</p>
        </div>
      </div>
    </footer>
  );
}
