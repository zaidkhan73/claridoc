"use client";
import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <nav className="container flex flex-wrap items-center justify-between py-4 lg:py-6 lg:px-8 mx-auto">
      {/* Left logo */}
      <div className="flex items-center lg:flex-1">
        <NavLink href="/" className="flex items-center gap-2 group">
          <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-gray-900 transform transition duration-300 ease-in-out group-hover:rotate-12" />
          <span className="font-extrabold text-lg lg:text-xl text-gray-900">
            ClariDoc
          </span>
        </NavLink>
      </div>

      {/* Center navigation */}
      <div className="flex gap-4 lg:gap-8 items-center">
        <NavLink href="/#pricing" className="capitalize">
          Pricing
        </NavLink>
        <SignedIn>
          <NavLink href="/dashboard" className="capitalize">
            Your Summary
          </NavLink>
        </SignedIn>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
        <SignedIn>
          <NavLink href="/upload" className="capitalize">
            Upload a PDF
          </NavLink>
          <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
            Pro
          </span>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <NavLink href="/sign-in" className="capitalize">
            Sign In
          </NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
