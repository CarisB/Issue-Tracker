import { IssueStatus } from "@prisma/client";

export const statusMap: Record<
  IssueStatus,
  { label: string; color: "green" | "blue" | "gray" }
> = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "gray" },
};
