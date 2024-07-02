import prisma from "@/prisma/db";
import { IssueStatus } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import IssueStatusBadge from "../_components/IssueStatusBadge";
import Link from "../_components/Link";
import IssuesToolbar from "./IssuesToolbar";

interface Props {
  searchParams: {
    status?: IssueStatus;
  };
}

async function IssuesPage({ searchParams }: Props) {
  let status;

  // Validate the status query parameter
  if (searchParams.status) {
    const statusList = Object.values(IssueStatus);
    status = statusList.includes(searchParams.status)
      ? searchParams.status
      : undefined;
  }

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
  });

  return (
    <div>
      <IssuesToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created On
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Table.Cell>
              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

// This page must be dynamically rendered to disable cache
export const dynamic = "force-dynamic";
export default IssuesPage;
