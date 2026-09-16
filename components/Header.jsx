"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, shopCategories } from "@/lib/data";
import { BagIcon, HeartIcon, SearchIcon, UserIcon } from "./Icons";
import { useWishlist } from "./UiProviders";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const { count } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || open || !isHome;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header className="site-header fixed inset-x-0 top-0 z-50">
        <div
          className={`transition-[background-color,border-color,backdrop-filter] duration-300 ${
            solid
              ? "border-b border-white/10 bg-[#05070c]/88 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="hero-wrap relative flex h-[68px] min-w-0 items-center justify-between lg:h-[76px]">
            <Link
              href="/"
              className="relative z-10 flex min-w-0 shrink-0 items-center"
              aria-label="Phil's Pharma home"
            >
              <span className="relative block h-8 w-[142px] overflow-hidden sm:h-10 sm:w-[178px]">
                <Image
                  src="/images/logo.jpeg"
                  alt="Phil's Pharma"
                  fill
                  priority
                  sizes="178px"
                  className="logo-mark object-cover object-center"
                />
              </span>
            </Link>

            <nav
              className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 xl:flex xl:gap-10"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="nav-link"
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-4 text-white/70 xl:flex">
              <Link href="/search" className="flex h-9 w-9 items-center justify-center hover:text-white" aria-label="Search">
                <SearchIcon />
              </Link>
              <button type="button" className="label px-1 text-white/70 hover:text-white">
                GBP £
              </button>
              <span className="h-4 w-px bg-white/20" aria-hidden="true" />
              <Link href="/account" className="flex h-9 w-9 items-center justify-center hover:text-white" aria-label="Account">
                <UserIcon />
              </Link>
              <span className="h-4 w-px bg-white/20" aria-hidden="true" />
              <Link
                href="/account#wishlist"
                className="relative flex h-9 w-9 items-center justify-center hover:text-white"
                aria-label={`Wishlist, ${count} items`}
              >
                <HeartIcon />
                {count > 0 ? (
                  <span className="absolute top-0.5 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1677FF] text-[8px] font-semibold text-white">
                    {count}
                  </span>
                ) : null}
              </Link>
              <span className="h-4 w-px bg-white/20" aria-hidden="true" />
              <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center hover:text-white" aria-label="Bag, 3 items">
                <BagIcon />
                <span className="absolute top-0.5 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1677FF] text-[8px] font-semibold text-white">
                  3
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-0.5 xl:hidden">
              <Link
                href="/account#wishlist"
                className="relative flex h-11 w-11 items-center justify-center text-white/80"
                aria-label={`Wishlist, ${count} items`}
              >
                <HeartIcon />
                {count > 0 ? (
                  <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1677FF] text-[8px] font-semibold text-white">
                    {count}
                  </span>
                ) : null}
              </Link>
              <Link href="/cart" className="relative flex h-11 w-11 items-center justify-center text-white/80" aria-label="Bag, 3 items">
                <BagIcon />
                <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1677FF] text-[8px] font-semibold text-white">
                  3
                </span>
              </Link>
              <button
                type="button"
                className="relative z-10 flex h-11 w-11 items-center justify-center"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={() => setOpen((value) => !value)}
              >
                <span className="sr-only">Menu</span>
                <span className="flex w-[18px] flex-col gap-[6px]">
                  <span
                    className={`block h-px w-full bg-fg transition-transform duration-300 ${
                      open ? "translate-y-[3.5px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-px w-full bg-fg transition-transform duration-300 ${
                      open ? "-translate-y-[3.5px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-[#05070c]/98 pt-[68px] transition-all duration-300 xl:hidden ${
          open ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <nav className="hero-wrap mobile-nav-panel flex min-h-[calc(100svh-68px)] flex-col" aria-label="Mobile">
          <p className="label border-b border-white/10 py-4 text-faint">Index</p>
          <div className="flex flex-col">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-baseline justify-between gap-4 border-b border-white/10 py-4"
              >
                <span className="display text-[clamp(1.7rem,8vw,2.5rem)] tracking-[-0.04em]">
                  {link.label}
                </span>
                <span className="label shrink-0 text-faint">{String(index + 1).padStart(2, "0")}</span>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <p className="label text-faint">Categories</p>
            <div className="mt-3 flex flex-col border-t border-white/10">
              {shopCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 py-3 text-sm text-white/75 hover:text-white"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Link href="/shop" onClick={() => setOpen(false)} className="btn btn-hero w-full">
              Shop peptides
            </Link>
            <Link href="/account" onClick={() => setOpen(false)} className="btn btn-ghost w-full">
              Account
            </Link>
            <Link href="/account#wishlist" onClick={() => setOpen(false)} className="btn btn-ghost w-full">
              Wishlist
            </Link>
            <p className="label pt-5 text-faint">GBP £ · Research use only</p>
          </div>
        </nav>
      </div>
    </>
  );
}
