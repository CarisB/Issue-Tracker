import { Component1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

function IssuesToolbar() {
  return (
    <div className="mb-5">
      <Link href="/issues/new">
        <Button variant="soft">
          <Component1Icon />
          Create Issue
        </Button>
      </Link>
    </div>
  );
}

export default IssuesToolbar;
