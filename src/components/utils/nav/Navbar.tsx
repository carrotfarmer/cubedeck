import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiMenu, FiX } from "react-icons/fi";
import { auth } from "../../../firebase.config";
import { Brand } from "../../std/Brand";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { LoginButton } from "./ProfileButton";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const links = user
    ? [
        { label: "Sessions", href: "/" },
        { label: "Groups", href: "/groups" },
        { label: "Timer", href: "/timer" },
        { label: "Guide", href: "/guide" },
      ]
    : [
        { label: "Timer", href: "/timer" },
        { label: "Guide", href: "/guide" },
      ];
  const isActive = (href: string) =>
    href === "/"
      ? router.pathname === "/" || router.pathname.startsWith("/session/")
      : router.pathname === href ||
        (href === "/groups" && router.pathname.startsWith("/group/"));
  const navLinks = links.map((link) => (
    <Link key={link.href} href={link.href} passHref>
      <a
        onClick={() => setOpen(false)}
        aria-current={isActive(link.href) ? "page" : undefined}
        className={`rounded px-3 py-2 text-xs transition-colors ${
          isActive(link.href) ? "bg-soft text-ink" : "text-muted hover:text-ink"
        }`}
      >
        {link.label}
      </a>
    </Link>
  ));
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/95 backdrop-blur-sm">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[64px] max-w-5xl flex-wrap items-center justify-between gap-x-4 px-5 sm:px-8"
      >
        <Link href="/" passHref>
          <a aria-label="Cubedeck home" onClick={() => setOpen(false)}>
            <Brand />
          </a>
        </Link>
        <div className="ml-4 mr-auto hidden items-center gap-1 sm:flex">
          {navLinks}
        </div>
        <div className="flex items-center gap-1.5">
          <DarkModeSwitch />
          <div className="hidden sm:block">
            <LoginButton />
          </div>
          <button
            type="button"
            className="icon-btn sm:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
        {open && (
          <div
            id="mobile-navigation"
            className="flex w-full flex-col gap-1 border-t border-line py-3 sm:hidden"
          >
            {navLinks}
            <div className="px-3 pt-2">
              <LoginButton />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
