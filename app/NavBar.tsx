import Link from "next/link";
import React from "react";
import { BsBugFill } from "react-icons/bs";

function NavBar() {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="flex space-x-10 p-5 mb-5 border-b items-center bg-slate-700">
      <Link href="/">
        <BsBugFill size={30} />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="hover:text-emerald-200 transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
