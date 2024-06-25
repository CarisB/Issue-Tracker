import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/db";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

async function EditIssuePage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return notFound();

  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
