import prisma from "@/prisma/db";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueHeading from "./IssueHeading";
import IssueMdDescription from "./IssueMdDescription";
import IssueSubheading from "./IssueSubheading";

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
    <>
      <IssueHeading title={issue.title} status={issue.status} />
      <IssueSubheading
        createdAt={issue.createdAt}
        updatedAt={issue.updatedAt}
      />
      <Grid columns={{ initial: "1", md: "2" }} gap="5" mt="5">
        <Box>
          <IssueMdDescription description={issue.description} />
        </Box>
        <Box>
          <EditIssueButton issueId={issue.id} />
        </Box>
      </Grid>
    </>
  );
}

export default IssueDetailPage;
