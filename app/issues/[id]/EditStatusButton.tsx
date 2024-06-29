import { IssueStatus } from "@prisma/client";
import { CheckCircledIcon, DropdownMenuIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";

interface Props {
  selectedStatus: IssueStatus | undefined;
  onSelect: (status: IssueStatus) => void;
}

const statusMap: Map<IssueStatus, string> = new Map([
  [IssueStatus.OPEN, "Open"],
  [IssueStatus.IN_PROGRESS, "In Progress"],
  [IssueStatus.CLOSED, "Closed"],
]);

function EditStatusButton({ selectedStatus, onSelect }: Props) {
  const color = "indigo";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button color={color} className="cursor-pointer">
          <DropdownMenuIcon />
          Edit Status
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content color={color}>
        {Array.from(statusMap).map(([status, label]) => (
          <DropdownMenu.Item
            key={status}
            onSelect={() => onSelect(status)}
            className="cursor-pointer"
          >
            {label}
            {status === selectedStatus && <CheckCircledIcon />}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default EditStatusButton;
