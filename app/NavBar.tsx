"use client";

import { Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";
import UserMenu from "./UserMenu";

export default function NavBar() {
  return (
    <nav className="p-5 bg-teal-950 text-white">
      <Container>
        <Flex justify="between">
          <Flex gap="5" align="center">
            <Link href="/">
              <BsBugFill
                size={30}
                className="transition ease-in-out hover:scale-110"
              />
            </Link>
            <NavMenu />
          </Flex>
          <Flex align="center">
            <UserMenu />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
}

function NavMenu() {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  const currentPath = usePathname();

  return (
    <ul className="flex space-x-6 p-5 bg-teal-900 rounded-xl">
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
  );
}
