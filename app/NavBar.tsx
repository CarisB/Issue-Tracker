"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";
import DarkModeSwitch from "./DarkModeSwitch";
import AuthButton from "./issues/_components/AuthButton";
import { Container, Flex } from "@radix-ui/themes";

function NavBar() {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  const currentPath = usePathname();

  return (
    <nav className="p-5 bg-teal-950 text-white">
      <Container>
        <Flex justify="between">
          <Flex gap="5" align="center">
            <Link href="/">
              <BsBugFill size={30} />
            </Link>
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
            <AuthButton />
          </Flex>
          <Flex align="center" className="hidden sm:flex">
            <DarkModeSwitch />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;
