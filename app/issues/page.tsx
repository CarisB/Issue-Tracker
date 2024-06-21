import { Component1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

function IssuesPage() {
  return (
    <div>
      <Button variant="soft">
        <Component1Icon />
        <Link href="/issues/new">Create Issue</Link>
      </Button>
    </div>
  );
}

export default IssuesPage;
