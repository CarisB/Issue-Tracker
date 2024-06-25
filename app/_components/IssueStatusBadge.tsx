import { IssueStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

interface Props {
  status: IssueStatus;
}

const statusMap: Record<
  IssueStatus,
  { label: string; color: "green" | "blue" | "gray" }
> = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "gray" },
};

function IssueStatusBadge({ status }: Props) {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
}

export default IssueStatusBadge;
