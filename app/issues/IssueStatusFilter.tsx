"use client";

import { IssueStatus } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { BsFilter } from "react-icons/bs";

function IssueStatusFilter() {
  const statuses: { label: string; value?: IssueStatus }[] = [
    { label: "All" },
    { label: "Open", value: IssueStatus.OPEN },
    { label: "In Progress", value: IssueStatus.IN_PROGRESS },
    { label: "Closed", value: IssueStatus.CLOSED },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (status: string) => {
    const params = new URLSearchParams();
    const orderBy = searchParams.get("orderBy");
    const sort = searchParams.get("sort");

    if (status !== "null") params.append("status", status);
    if (orderBy) params.append("orderBy", orderBy);
    if (sort) params.append("sort", sort);

    const query = params.size ? `?${params.toString()}` : "";
    router.push(`/issues${query}`);
  };

  return (
    <Flex align="center" gap="1">
      <BsFilter size="20" />
      <Select.Root
        defaultValue={searchParams.get("status") || ""}
        onValueChange={handleValueChange}
      >
        <Select.Trigger placeholder="Filter by Status" />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item
              key={status.value || "null"}
              value={status.value || "null"}
            >
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
}

export default IssueStatusFilter;
