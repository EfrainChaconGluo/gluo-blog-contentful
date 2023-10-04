import React from "react";
import GluoLogo from "./GluoLogo";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="max-w-[1300px] mx-auto px-3 py-4">
      <Link href="/">
        <GluoLogo />
      </Link>
    </nav>
  );
}
