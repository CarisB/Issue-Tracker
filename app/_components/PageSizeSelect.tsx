"use client";

import SearchParamsList from "@/app/issues/searchParamsList";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  pageSize: number;
  pageSizeOptions: number[];
}

function PageSizeSelect({ pageSize, pageSizeOptions }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams();

  const [size, setSize] = useState(pageSize);

  const handleValueChange = (value: string) => {
    setSize(parseInt(value));

    SearchParamsList.forEach((param) => {
      if (param === "pageSize" || param === "page") return;

      const val = searchParams.get(param);
      if (val) params.append(param, val);
    });

    if (parseInt(value) !== pageSizeOptions[0])
      params.append("pageSize", value);
    router.push(`?${params.toString()}`);
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
