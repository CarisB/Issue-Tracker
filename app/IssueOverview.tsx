import { IssueStatus } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  issueCount: {
    open: number;
    inProgress: number;
    closed: number;
  };
}

function IssueOverview({ issueCount }: Props) {
  const containers = [
    { label: "Open", status: IssueStatus.OPEN, count: issueCount.open },
    {
      label: "In Progress",
      status: IssueStatus.IN_PROGRESS,
      count: issueCount.inProgress,
    },
    { label: "Closed", status: IssueStatus.CLOSED, count: issueCount.closed },
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
