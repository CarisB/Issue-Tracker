"use client";

import { Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";
import UserMenu from "./UserMenu";

export default function NavBar() {
  return (
    <nav
      style={{ background: "var(--nav-bg)" }}
      className="p-5 text-white shadow-xl dark:shadow-none"
    >
      <Container>
        <Flex justify="between">
          <Flex gap="5" align="center">
            <Link href="/">
              <BsBugFill
                size={30}
                className="drop-shadow-lg transition ease-in-out hover:scale-110"
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
    <ul
      style={{ background: "var(--nav-links-bg)" }}
      className="flex space-x-6 p-5 rounded-2xl dark:shadow-xl"
    >
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={classNames({
              "font-bold": currentPath === href,
              "drop-shadow-xl": currentPath === href,
              "hover:drop-shadow-xl": true,
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
