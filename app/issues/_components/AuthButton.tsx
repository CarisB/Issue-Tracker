import { Box, Button } from "@radix-ui/themes";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { status, data: session } = useSession();
  let handler: () => void, label;

  if (status === "unauthenticated") {
    handler = signIn;
    label = "Login";
  } else if (status === "authenticated") {
    handler = signOut;
    label = "Logout";
  }

  return (
    <Box>
      <Button onClick={() => handler()}>{label}</Button>
    </Box>
  );
}

export default AuthButton;
