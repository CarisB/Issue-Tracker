import { z } from "zod";
import { IssueStatus } from "@prisma/client";

export const issueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().max(65535),
  status: z.nativeEnum(IssueStatus),
});

export const patchIssueSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().max(65535).optional(),
  status: z.nativeEnum(IssueStatus).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});
