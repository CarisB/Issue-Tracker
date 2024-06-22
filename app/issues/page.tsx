import prisma from "@/prisma/db";
import { Component1Icon } from "@radix-ui/react-icons";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";

async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <Table.Root variant="surface" className="mb-10">
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
              <Table.Cell>{issue.title}</Table.Cell>
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
      <Link href="/issues/new">
        <Button variant="soft" className="cursor-pointer">
          <Component1Icon />
          Create Issue
        </Button>
      </Link>
    </div>
  );
}

export default IssuesPage;
