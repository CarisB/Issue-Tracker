import { Component1Icon } from "@radix-ui/react-icons";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const issues = [1, 2, 3, 4, 5];

function LoadingIssuesPage() {
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
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton />
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

export default LoadingIssuesPage;
