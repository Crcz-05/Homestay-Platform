"use client";

import ThemeToggle from "./ThemeToggle";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function LogoMark() {
  return (
    <span
      className="stamp h-9 w-9 shrink-0 border-marigold/70 text-marigold"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
        <path
          d="M12 3 4 8v13h16V8l-8-5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M9 21v-7h6v7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [loggedIn, setLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setLoggedIn(!!token);
    };

    checkLogin();

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setLoggedIn(false);

    alert("Logged out successfully!");

    router.push("/login");
    router.refresh();
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/showcase", label: "Showcase" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const linkClasses = (href: string) =>
    `text-sm font-medium tracking-wide transition-colors ${
      pathname === href ? "text-marigold" : "text-paper/80 hover:text-marigold"
    }`;

  const navLinks = (
    <>
      {links.map((link) => (
        <a key={link.href} href={link.href} className={linkClasses(link.href)}>
          {link.label}
        </a>
      ))}

      {loggedIn ? (
        <button
          onClick={handleLogout}
          className="text-left text-sm font-medium tracking-wide text-paper/80 transition-colors hover:text-marigold"
        >
          Logout
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <a
            href="/login"
            className="rounded-full border border-paper/25 px-4 py-1.5 text-sm font-medium text-paper/90 transition-colors hover:border-marigold hover:text-marigold"
          >
            Login
          </a>

          <a
            href="/register"
            className="rounded-full bg-marigold px-4 py-1.5 text-sm font-semibold text-pine-950 transition-colors hover:bg-marigold-dark"
          >
            Register
          </a>
        </div>
      )}

      <ThemeToggle />
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 bg-pine-950/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-[0_8px_24px_-16px_rgba(0,0,0,0.6)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="/" className="flex items-center gap-3">
          <LogoMark />
          <span className="font-display text-lg leading-none text-paper">
            RuralStay
            <span className="font-mono text-marigold">.ai</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">{navLinks}</div>

        {/* Mobile menu button */}
        <button
          className="rounded-md p-2 text-paper hover:bg-pine-800 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile links */}
      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-pine-800 px-5 pb-6 pt-4 md:hidden">
          {navLinks}
        </div>
      )}
    </nav>
  );
}
