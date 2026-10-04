import Link from "next/link";
import { AccountIcon, BagIcon, SearchIcon } from "@/components/icons";
import { MobileMenu } from "@/components/mobile-menu";
import { navigation } from "@/lib/catalog";

const iconButton = "btn btn-icon btn-secondary [--btn-line:transparent]";

export function SiteHeader() {
  return (
    <>
      <p className="theme-inverse container-fluid py-2 text-center type-small">
        Complimentary express shipping and returns on every order
      </p>

      <header className="sticky top-0 z-40 border-b border-divider bg-background">
        <div className="container-fluid grid h-header grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex items-center gap-1">
            <MobileMenu items={navigation} />
            <Link href="/search" className={iconButton} aria-label="Search">
              <SearchIcon />
            </Link>
          </div>

          <Link
            href="/"
            className="type-title-l tracking-[0.18em] lg:tracking-[0.24em]"
            aria-label="Ateiler home"
          >
            Ateiler
          </Link>

          <div className="flex items-center justify-end gap-1">
            <Link
              href="/account"
              className={`${iconButton} hidden md:inline-flex`}
              aria-label="Account"
            >
              <AccountIcon />
            </Link>
            <Link href="/bag" className={iconButton} aria-label="Shopping bag, 0 items">
              <BagIcon />
            </Link>
          </div>
        </div>

        <nav aria-label="Main" className="hidden pb-4 lg:block">
          <ul className="flex justify-center gap-10 type-small-strong uppercase">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-quiet">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
