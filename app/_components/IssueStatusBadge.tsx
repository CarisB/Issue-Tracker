import { IssueStatus } from "@prisma/client";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Badge, Flex } from "@radix-ui/themes";

interface Props {
  status: IssueStatus;
  updatedStatus?: IssueStatus;
}

const statusMap: Record<
  IssueStatus,
  { label: string; color: "green" | "blue" | "gray" }
> = {
  OPEN: { label: "Open", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "gray" },
};

function IssueStatusBadge({ status, updatedStatus }: Props) {
  return (
    <Flex>
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
      {updatedStatus && (
        <Flex align={"center"}>
          <DoubleArrowRightIcon color="teal" />
          <Badge color={statusMap[updatedStatus].color}>
            {statusMap[updatedStatus].label}
          </Badge>
        </Flex>
      )}
    </Flex>
  );
}

export default IssueStatusBadge;
