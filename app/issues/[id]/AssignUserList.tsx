import { Select } from "@radix-ui/themes";

function AssignUserList() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign to..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">John Doe</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssignUserList;
