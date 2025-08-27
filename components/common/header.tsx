"use client";
import { FileText, Menu, X } from "lucide-react";
import NavLink from "./nav-link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 👉 Jab bhi pathname change hoga (page load ya route change), menu close ho jaayega
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-background border-b border-border shadow-sm transition-colors duration-300">
      <div className="container flex items-center justify-between py-4 lg:py-6 lg:px-8 mx-auto">
        {/* Left logo */}
        <div className="flex items-center lg:flex-1">
          <NavLink href="/" className="flex items-center gap-2 group">
            <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-primary transform transition duration-300 ease-in-out group-hover:rotate-12" />
            <span className="font-extrabold text-lg lg:text-xl text-foreground">
              ClariDoc
            </span>
          </NavLink>
        </div>

        {/* Hamburger button for mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-md border border-border bg-background shadow-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300 ease-in-out focus:outline-none"
        >
          <span className="sr-only">Toggle menu</span>
          {isOpen ? (
            <X className="w-7 h-7 transition-transform duration-300 ease-in-out rotate-90" />
          ) : (
            <Menu className="w-7 h-7 transition-transform duration-300 ease-in-out rotate-0" />
          )}
        </button>

        {/* Desktop menu */}
        <div className="hidden lg:flex gap-5 items-center">
          <NavLink href="/#pricing" className="capitalize hover:text-primary transition-colors">
            Pricing
          </NavLink>
          <SignedIn>
            <NavLink
              href="/dashboard"
              className="capitalize hover:text-primary transition-colors"
            >
              Your Summary
            </NavLink>
          </SignedIn>
          <SignedIn>
            <NavLink href="/upload" className="capitalize rounded-md transition-colors">
              Upload a PDF
            </NavLink>
            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
              Pro
            </span>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <NavLink
              href="/sign-in"
              className="capitalize px-1 py-1 rounded-md hover:text-primary transition-colors"
            >
              Sign In
            </NavLink>
          </SignedOut>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`lg:hidden flex flex-col gap-4 px-6 overflow-hidden transition-all duration-300 ease-in-out bg-background ${
          isOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <NavLink href="/#pricing" className="capitalize hover:text-primary transition-colors">
          Pricing
        </NavLink>
        <SignedIn>
          <NavLink href="/dashboard" className="capitalize hover:text-primary transition-colors">
            Your Summary
          </NavLink>
        </SignedIn>
        <SignedIn>
          <NavLink href="/upload" className="capitalize hover:text-primary transition-colors">
            Upload a PDF
          </NavLink>
          <div className="flex gap-2 items-center">
            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded w-max">
              Pro
            </span>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink
            href="/sign-in"
            className="capitalize hover:text-primary rounded-md transition-colors"
          >
            Sign In
          </NavLink>
        </SignedOut>
        <div className="flex justify-start">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}