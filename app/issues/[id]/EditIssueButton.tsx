"use client";

import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface Props {
  issueId: number;
}

function EditIssueButton({ issueId }: Props) {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(`/issues/${issueId}/edit`)}>
      <Pencil2Icon />
      Edit Issue
    </Button>
  );
}

export default EditIssueButton;
