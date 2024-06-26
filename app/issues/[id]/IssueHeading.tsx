import IssueStatusBadge from "@/app/_components/IssueStatusBadge";
import { IssueStatus } from "@prisma/client";
import { Flex, Heading } from "@radix-ui/themes";

interface Props {
  title: string;
  status: IssueStatus;
  updatedStatus?: IssueStatus;
}

function IssueHeading({ title, status, updatedStatus }: Props) {
  return (
    <Flex gap={"3"} align={"center"}>
      <Heading>{title}</Heading>
      <IssueStatusBadge
        status={status}
        updatedStatus={updatedStatus !== status ? updatedStatus : undefined}
      />
    </Flex>
  );
}

export default IssueHeading;
