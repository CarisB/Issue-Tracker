import prisma from "@/prisma/db";
import { IssueStatus } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

async function IssueOverview() {
  const open = await prisma.issue.count({
    where: { status: IssueStatus.OPEN },
  });
  const inProgress = await prisma.issue.count({
    where: { status: IssueStatus.IN_PROGRESS },
  });
  const closed = await prisma.issue.count({
    where: { status: IssueStatus.CLOSED },
  });

  const containers = [
    { label: "Open", status: IssueStatus.OPEN, count: open },
    {
      label: "In Progress",
      status: IssueStatus.IN_PROGRESS,
      count: inProgress,
    },
    { label: "Closed", status: IssueStatus.CLOSED, count: closed },
  ];

  return (
    <Flex gap="2">
      {containers.map((container) => (
        <Link
          key={container.status}
          href={`/issues?status=${container.status}`}
        >
          <Card className="p-5">
            <Flex direction="column" gap="2">
              <Heading size="2" weight="light" align="right">
                {container.label}
              </Heading>
              <Text size="5" weight="bold" align="right">
                {container.count}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
}

export default IssueOverview;
