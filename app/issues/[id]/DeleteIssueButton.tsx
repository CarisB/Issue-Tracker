import { AlertDialog, Button, Flex } from "@radix-ui/themes";

interface Props {
  issueId: number;
}

function DeleteIssueButton({ issueId }: Props) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action is
          irreversible.
        </AlertDialog.Description>
        <Flex mt="3" gap="2" justify={"center"}>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">Delete Issue</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export default DeleteIssueButton;
