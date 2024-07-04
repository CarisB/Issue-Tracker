import prisma from "@/prisma/db";
import { notFound } from "next/navigation";
import IssueDetailLayout from "./IssueDetailLayout";

interface Props {
  params: {
    id: string;
  };
}

async function IssueDetailPage({ params }: Props) {
  if (!parseInt(params.id)) return notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return notFound();

  return <IssueDetailLayout issue={issue} />;
}

export async function generateMetadata({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: `[#${issue?.id}] ${issue?.title}`,
    description: `Details of issue #${issue?.id}`,
  };
}

export default IssueDetailPage;
