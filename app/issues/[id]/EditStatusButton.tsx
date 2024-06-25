import { DropdownMenuIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu } from "@radix-ui/themes";

function EditStatusButton() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button color="indigo">
          <DropdownMenuIcon />
          Edit Status
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content color={"indigo"}>
        <DropdownMenu.Item>Open</DropdownMenu.Item>
        <DropdownMenu.Item>In Progress</DropdownMenu.Item>
        <DropdownMenu.Item>Closed</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default EditStatusButton;
