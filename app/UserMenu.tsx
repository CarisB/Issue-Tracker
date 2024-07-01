import { Avatar, Box, Button, DropdownMenu, Text } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import Spinner from "./_components/Spinner";

function UserMenu() {
  const { status, data: session } = useSession();

  if (status === "loading") return <Spinner />;

  if (status === "unauthenticated")
    return <Button onClick={() => signIn()}>Login</Button>;

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session!.user!.image!}
              alt={session!.user!.name!}
              fallback="?"
              radius="full"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content sideOffset={5} variant="soft">
            <DropdownMenu.Label>
              <Text color="cyan">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item onSelect={() => signOut()}>
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
}

export default UserMenu;
