import { Component1Icon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

function IssuesToolbar() {
  return (
    <Flex justify={"between"}>
      <Link href="/issues/new">
        <Button variant="soft">
          <Component1Icon />
          Create Issue
        </Button>
      </Link>
      <IssueStatusFilter />
    </Flex>
  );
}

export default IssuesToolbar;
