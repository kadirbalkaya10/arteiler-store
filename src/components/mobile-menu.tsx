"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";

type NavItem = { label: string; href: string };

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const openButton = openRef.current;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      openButton?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={openRef}
        type="button"
        className="btn btn-icon btn-secondary [--btn-line:transparent] lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background lg:hidden"
        >
          <div className="container-fluid flex h-header shrink-0 items-center border-b border-divider">
            <button
              ref={closeRef}
              type="button"
              className="btn btn-icon btn-secondary [--btn-line:transparent]"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Main" className="container-fluid py-8">
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="type-title-m link-quiet"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="container-fluid mt-auto flex flex-col gap-3 border-t border-divider py-8 type-small text-muted">
            <Link href="/account" className="link-quiet w-fit">
              Sign in or create an account
            </Link>
            <Link href="/stores" className="link-quiet w-fit">
              Find a store
            </Link>
            <Link href="/contact" className="link-quiet w-fit">
              Contact client services
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
