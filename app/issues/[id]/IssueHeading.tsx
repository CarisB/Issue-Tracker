import IssueStatusBadge from "@/app/_components/IssueStatusBadge";
import { $Enums } from "@prisma/client";
import { Flex, Heading } from "@radix-ui/themes";
import React from "react";

interface Props {
  title: string;
  status: $Enums.IssueStatus;
}

function IssueHeading({ title, status }: Props) {
  return (
    <Flex gap={"3"} align={"center"}>
      <Heading>{title}</Heading>
      <IssueStatusBadge status={status} />
    </Flex>
  );
}

export default IssueHeading;
