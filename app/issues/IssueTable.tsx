import { Issue, IssueStatus } from "@prisma/client";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueStatusBadge from "../_components/IssueStatusBadge";
import Link from "../_components/Link";

interface Props {
  issues: Issue[];
  searchParams: IssueQueryParams;
}

function IssueTable({ issues, searchParams }: Props) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {orderByList.map((orderBy) => (
            <Table.ColumnHeaderCell
              key={orderBy.value}
              className={orderBy.className}
            >
              <NextLink
                href={
                  // Update the query parameters
                  {
                    query: {
                      ...searchParams,
                      orderBy: orderBy.value,
                      sort:
                        searchParams.orderBy === orderBy.value &&
                        searchParams.sort === "asc"
                          ? "desc"
                          : "asc",
                    },
                  }
                }
                className="flex items-center gap-1"
              >
                {orderBy.label}
                {searchParams.orderBy === orderBy.value &&
                  searchParams.sort === "asc" && <TriangleUpIcon />}
                {searchParams.orderBy === orderBy.value &&
                  searchParams.sort === "desc" && <TriangleDownIcon />}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
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
            <Table.Cell className={hiddenClassName}>
              {issue.createdAt.toLocaleString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export interface IssueQueryParams {
  status?: IssueStatus;
  orderBy?: keyof Issue;
  sort?: "asc" | "desc";
  page?: string;
  pageSize?: string;
}

const hiddenClassName = "hidden md:table-cell";

// Define the columns to order by
const orderByList: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  {
    label: "Created On",
    value: "createdAt",
    className: hiddenClassName,
  },
];

export const orderByValues = orderByList.map((orderBy) => orderBy.value);

export default IssueTable;
