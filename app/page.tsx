import prisma from "@/prisma/db";
import { IssueStatus } from "@prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueChart from "./IssueChart";
import IssueOverview from "./IssueOverview";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5" align="end">
        <IssueOverview issueCount={issueCount} />
        <IssueChart issueCount={issueCount} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker | Dashboard",
  description: "View a summary of project issues",
};
