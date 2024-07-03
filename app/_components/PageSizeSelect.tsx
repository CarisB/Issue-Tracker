"use client";

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  pageSize: number;
}

const pageSizeOptions = [5, 10, 15, 20, 25];

function PageSizeSelect({ pageSize }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams();

  const [size, setSize] = useState(pageSize);

  const handleValueChange = (value: string) => {
    setSize(parseInt(value));
  };

  return (
    <Select.Root onValueChange={handleValueChange}>
      <Select.Trigger placeholder={`Show ${size} items per page`}>
        Show {size} items per page
      </Select.Trigger>
      <Select.Content>
        {pageSizeOptions.map((option) => (
          <Select.Item key={option} value={option.toString()}>
            {option}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default PageSizeSelect;
