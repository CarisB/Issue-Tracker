import { z } from "zod";
import { IssueStatus } from "@prisma/client";

export const issueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().max(65535),
  status: z.nativeEnum(IssueStatus),
});
