"use client";

import SearchParamsList from "@/app/issues/searchParamsList";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Grid, Text } from "@radix-ui/themes";
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

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const handlePageChange = (page: number) => {
    SearchParamsList.forEach((param) => {
      if (param === "page") return;

      const val = searchParams.get(param);
      if (val) params.append(param, val);
    });

    params.append("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex align="center" gap="2">
      <Text mr="3">
        Page {currentPage} of {pageCount}
      </Text>
      <Flex align="center" gap="1">
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
    </Flex>
  );
}

export default Pagination;
