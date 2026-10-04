import Link from "next/link";

const columns = [
  {
    title: "Client services",
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Shipping", href: "/help/shipping" },
      { label: "Returns and exchanges", href: "/help/returns" },
      { label: "Care guide", href: "/help/care" },
      { label: "FAQ", href: "/help" },
    ],
  },
  {
    title: "The house",
    links: [
      { label: "About Ateiler", href: "/about" },
      { label: "Craftsmanship", href: "/about/craft" },
      { label: "Sustainability", href: "/about/sustainability" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Find a store", href: "/stores" },
      { label: "Book an appointment", href: "/appointments" },
      { label: "Gift cards", href: "/gift-cards" },
      { label: "Your account", href: "/account" },
    ],
  },
];

const legal = [
  { label: "Privacy policy", href: "/legal/privacy" },
  { label: "Terms of sale", href: "/legal/terms" },
  { label: "Cookie settings", href: "/legal/cookies" },
  { label: "Accessibility", href: "/legal/accessibility" },
];

export function SiteFooter() {
  return (
    <footer className="theme-inverse">
      <div className="container-page grid gap-10 py-section md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <p className="type-title-l tracking-[0.18em]">Ateiler</p>
          <p className="max-w-xs type-small text-muted">
            Modern luxury, made slowly. Clothing, bags and accessories crafted in small runs.
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="mb-4 type-eyebrow">{column.title}</h2>
            <ul className="flex flex-col gap-3 type-small">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-quiet">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-divider py-6 type-small text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Ateiler. All rights reserved.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legal.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-quiet">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
