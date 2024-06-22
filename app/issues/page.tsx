"use client";

import { Component1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

function IssuesPage() {
  const router = useRouter();

  return (
    <div>
      <Button
        variant="soft"
        className="cursor-pointer"
        onClick={() => router.push("/issues/new/")}
      >
        <Component1Icon />
        Create Issue
      </Button>
    </div>
  );
}

export default IssuesPage;
