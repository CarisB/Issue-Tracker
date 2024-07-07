import prisma from "@/prisma/db";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./_components/IssueStatusBadge";

async function LatestIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <Card className="p-5 shadow-lg">
      <Heading size="5" mb="2">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  <Flex
                    justify="between"
                    className="transition ease-in-out hover:translate-x-2"
                  >
                    <Flex direction="column" gap="3">
                      {issue.title}
                      <IssueStatusBadge status={issue.status} />
                    </Flex>

                    {issue.assignedToUser && (
                      <Avatar
                        src={issue.assignedToUser.image!}
                        fallback="?"
                        alt={issue.assignedToUser.name!}
                      />
                    )}
                  </Flex>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}

export default LatestIssues;
