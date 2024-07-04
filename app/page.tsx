import { Flex } from "@radix-ui/themes";
import IssueOverview from "./IssueOverview";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/db";
import { IssueStatus } from "@prisma/client";

export default async function Home() {
  const issueCount = {
    open: await prisma.issue.count({
      where: { status: IssueStatus.OPEN },
    }),
    inProgress: await prisma.issue.count({
      where: { status: IssueStatus.IN_PROGRESS },
    }),
    closed: await prisma.issue.count({
      where: { status: IssueStatus.CLOSED },
    }),
  };

  return (
    <Flex direction="column" gap="2">
      <LatestIssues />
      <IssueOverview issueCount={issueCount} />
    </Flex>
  );
}
