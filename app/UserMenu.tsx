import { Avatar, Box, Button, DropdownMenu, Text } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";
import Spinner from "./_components/Spinner";

function UserMenu() {
  const { status, data: session } = useSession();

  if (status === "loading") return <Spinner />;

  if (status === "unauthenticated")
    return (
      <Button onClick={() => signIn()} color="red">
        Login
      </Button>
    );

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
              className="mr-4 cursor-pointer outline-double outline-8 outline-offset-4 outline-pink-300 drop-shadow-lg transition ease-in-out hover:scale-110"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end" sideOffset={10} variant="soft">
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
