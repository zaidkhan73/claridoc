"use client";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavLink({
  children,
  href,
  className,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;    
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick} // <-- handle click
      className={cn(
        "transition-colors text-sm duration-300 text-gray-600 hover:text-rose-500",
        className,
        isActive && "text-rose-500"
      )}
    >
      {children}
    </Link>
  );
}
