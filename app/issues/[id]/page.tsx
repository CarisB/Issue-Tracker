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

export default IssueDetailPage;
