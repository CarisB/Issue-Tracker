"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams();
  const status = searchParams.get("status");
  const orderBy = searchParams.get("orderBy");
  const sort = searchParams.get("sort");

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const handlePageChange = (page: number) => {
    if (status) params.append("status", status);
    if (orderBy) params.append("orderBy", orderBy);
    if (sort) params.append("sort", sort);

    params.append("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align="center" gap="1">
      <Text mr="3">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        onClick={() => handlePageChange(1)}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        onClick={() => handlePageChange(pageCount)}
        color="gray"
        variant="soft"
        disabled={currentPage === pageCount}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
}

export default Pagination;
