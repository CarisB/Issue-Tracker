import prisma from "@/prisma/db";
import { Issue, IssueStatus } from "@prisma/client";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { Flex, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueStatusBadge from "../_components/IssueStatusBadge";
import Link from "../_components/Link";
import PageSizeSelect from "../_components/PageSizeSelect";
import Pagination from "../_components/Pagination";
import IssuesToolbar from "./IssuesToolbar";

interface Props {
  searchParams: {
    status?: IssueStatus;
    orderBy?: keyof Issue;
    sort?: "asc" | "desc";
    page?: string;
    pageSize?: string;
  };
}

const pageSizeOptions = [5, 10, 15, 20, 25];

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

  // Validate the pageSize query parameter
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize) > 0
      ? parseInt(searchParams.pageSize)
      : pageSizeOptions[0]
    : pageSizeOptions[0];

  // Fetch Issues from the database
  let page = searchParams.page ? parseInt(searchParams.page) : 1;
  const where = { status: status };
  const issueCount = await prisma.issue.count({ where });
  const pageCount = Math.ceil(issueCount / pageSize);
  page = page > pageCount ? pageCount : page;
  const issues = await prisma.issue.findMany({
    where,
    orderBy: {
      [orderBy || "id"]: sort || "asc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
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
      <Flex align="center" justify="between" mt="5">
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
        <div />
        <PageSizeSelect pageSize={pageSize} pageSizeOptions={pageSizeOptions} />
      </Flex>
    </div>
  );
}
// This page must be dynamically rendered to disable cache
export const dynamic = "force-dynamic";
export default IssuesPage;
