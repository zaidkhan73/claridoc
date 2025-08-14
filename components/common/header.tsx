"use client";
import { FileText } from "lucide-react";
import NavLink from "./nav-link";
import { Button } from "../ui/button";

export default function Header() {
  const isloggedIn = false;
  return (
    <nav className="container flex items-center justify-between py-4 lg:py-8 lg:px-8 mx-auto">
      <div className="flex lg:flex-1 ">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-2">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 transform transition duration-300 ease-in-out hover:rotate-12 hover:[transform:rotateY(30deg)]" />
          <span className="font-extrabold lg:text-xl text-gray-900">
            ClariDoc
          </span>
        </NavLink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">pricing</NavLink>
        {isloggedIn && <NavLink href="/dashboard">your summary</NavLink> }
        
      </div>

      <div className="flex lg:justify-center lg:flex-1 ">
        {isloggedIn ? (
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">upload a pdf</NavLink>
            <div>pro</div>
            <Button>User</Button>
          </div>
        ) : (
          <div>
            <NavLink href="/sign-in">sign-in</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
