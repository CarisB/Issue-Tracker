import { Avatar, Box, Button, DropdownMenu, Text } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";

function UserMenu() {
  const { status, data: session } = useSession();

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
      {status === "unauthenticated" && (
        <Button onClick={() => signIn()}>Login</Button>
      )}
    </Box>
  );
}

export default UserMenu;
