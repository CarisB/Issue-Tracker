import prisma from "@/prisma/db";
import { notFound } from "next/navigation";
import IssueDetailLayout from "./IssueDetailLayout";
import { cache } from "react";

interface Props {
  params: {
    id: string;
  };
}

const cachedIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

async function IssueDetailPage({ params }: Props) {
  if (!parseInt(params.id)) return notFound();

  const issue = await cachedIssue(parseInt(params.id));

  if (!issue) return notFound();

  return <IssueDetailLayout issue={issue} />;
}

export async function generateMetadata({ params }: Props) {
  const issue = await cachedIssue(parseInt(params.id));

  return {
    title: `[#${issue?.id}] ${issue?.title}`,
    description: `Details of issue #${issue?.id}`,
  };
}

export const dynamic = "force-dynamic";
export default IssueDetailPage;
