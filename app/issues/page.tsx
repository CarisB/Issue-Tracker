import prisma from "@/prisma/db";
import { Issue, IssueStatus } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueStatusBadge from "../_components/IssueStatusBadge";
import Link from "../_components/Link";
import IssuesToolbar from "./IssuesToolbar";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status?: IssueStatus;
    orderBy?: keyof Issue;
    sort?: "asc" | "desc";
  };
}

const hiddenClassName = "hidden md:table-cell";

async function IssuesPage({ searchParams }: Props) {
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

  // Validate the status query parameter
  const statusList = Object.values(IssueStatus);
  const status = searchParams.status
    ? statusList.includes(searchParams.status)
      ? searchParams.status
      : undefined
    : undefined;

  // Validate the orderBy query parameter
  const orderBy = searchParams.orderBy
    ? orderByList.map((orderBy) => orderBy.value).includes(searchParams.orderBy)
      ? searchParams.orderBy
      : undefined
    : undefined;

  // Validate the sort query parameter
  const sort = searchParams.sort
    ? searchParams.sort === "asc" || searchParams.sort === "desc"
      ? searchParams.sort
      : undefined
    : undefined;

  // Fetch Issues from the database
  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: {
      [orderBy || "id"]: sort || "asc",
    },
  });

  return (
    <div>
      <IssuesToolbar />
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
    </div>
  );
}

// This page must be dynamically rendered to disable cache
export const dynamic = "force-dynamic";
export default IssuesPage;
