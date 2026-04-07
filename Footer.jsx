const FOOTER_LINKS = [
  "Privacy Policy",
  "Terms & Conditions",
  "Support",
  "Documentation",
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-green-100 px-7 py-3.5 flex items-center justify-between gap-4 text-xs text-gray-400">
      <div>
        © 2026 <strong className="text-green-700 font-semibold">বাজার</strong>{" "}
        Admin Panel. All rights reserved.
      </div>

      <div className="flex items-center gap-5">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="hover:text-green-600 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="font-mono text-[11px] text-gray-300">
        v2.4.1 · Build 2026.03
      </div>
    </footer>
  );
}
