import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/db";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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

  return (
    <div>
      <Flex gap={"3"} align={"center"}>
        <Heading>{issue.title}</Heading>
        <IssueStatusBadge status={issue.status} />
      </Flex>
      <Text className="italic block my-2">
        {`Created on: ${issue.createdAt.toLocaleString()}, Last updated on: ${issue.updatedAt.toLocaleString()}`}
      </Text>
      <Card mt="5" className="prose dark:prose-invert">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}

export default IssueDetailPage;
