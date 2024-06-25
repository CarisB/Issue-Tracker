import { Text } from "@radix-ui/themes";

interface Props {
  createdAt: Date;
  updatedAt: Date;
}

function IssueSubheading({ createdAt, updatedAt }: Props) {
  return (
    <Text className="italic block my-2">
      {`Created on: ${createdAt.toLocaleString()}, Last updated on: ${updatedAt.toLocaleString()}`}
    </Text>
  );
}

export default IssueSubheading;
