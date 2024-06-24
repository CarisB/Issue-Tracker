"use client";

import { Flex, Switch } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

function DarkModeSwitch() {
  const [isMounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const onToggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);
  if (!isMounted) return null;

  return (
    <Flex align={"center"} gap="3">
      <BsFillSunFill />
      <Switch defaultChecked={isDark} onClick={onToggleTheme} />
      <BsFillMoonFill />
    </Flex>
  );
}

export default DarkModeSwitch;
