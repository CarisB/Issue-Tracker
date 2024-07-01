import Spinner from "@/app/_components/Spinner";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  issueId: number;
}

function DeleteIssueButton({ issueId }: Props) {
  const session = useSession();

  const router = useRouter();

  const [isDeleting, setDeleting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await fetch(`/api/issues/${issueId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setHasError(true);
    }
  };

  if (session.status !== "authenticated")
    return (
      <Button onClick={() => router.push("/api/auth/signin")} color="red">
        Delete Issue
      </Button>
    );

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Deleting Issue [id#: {issueId}]</AlertDialog.Title>
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
              <Button onClick={handleDelete} color="red">
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={hasError}>
        <AlertDialog.Content>
          <AlertDialog.Title>
            Error Deleting Issue [id#: {issueId}]
          </AlertDialog.Title>
          <AlertDialog.Description>
            An unexpected error has occurred. The Issue could not be deleted.
            Please try again later.
          </AlertDialog.Description>
          <Flex mt="3" gap="2" justify={"center"}>
            <AlertDialog.Action>
              <Button onClick={() => setHasError(false)} color="gray">
                Close
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

export default DeleteIssueButton;
