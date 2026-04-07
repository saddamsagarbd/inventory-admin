const FOOTER_LINKS = [
  "Privacy Policy",
  "Terms & Conditions",
  "Support",
  "Documentation",
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-green-100 px-4 md:px-7 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
      {/* Copyright */}
      <div className="order-2 sm:order-1">
        © 2026{" "}
        <strong className="text-green-700 font-semibold">বাজার</strong>{" "}
        Admin Panel. All rights reserved.
      </div>

      {/* Links — hidden on xs, visible on sm+ */}
      <nav className="hidden sm:flex items-center gap-4 order-1 sm:order-2">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="hover:text-green-600 transition-colors"
          >
            {link}
          </a>
        ))}
      </nav>

      {/* Build info */}
      <div className="font-mono text-[11px] text-gray-300 order-3">
        v2.4.1 · Build 2026.03
      </div>
    </footer>
  );
}
