"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";
import DarkModeSwitch from "./DarkModeSwitch";

function NavBar() {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  const currentPath = usePathname();

  return (
    <nav className="flex gap-10 p-5 items-center bg-teal-700 text-white">
      <Link href="/">
        <BsBugFill size={30} />
      </Link>
      <ul className="flex space-x-6 p-5 bg-teal-600 rounded-xl">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={classNames({
                "font-bold": currentPath === href,
                "hover:text-emerald-200 transition-colors": true,
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="ml-auto">
        <DarkModeSwitch />
      </div>
    </nav>
  );
}

export default NavBar;
