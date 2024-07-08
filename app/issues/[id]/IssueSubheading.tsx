import { Flex, Text } from "@radix-ui/themes";

interface Props {
  createdAt: Date;
  updatedAt: Date;
}

function IssueSubheading({ createdAt, updatedAt }: Props) {
  return (
    <Flex direction="column" mt="1" className="italic">
      <Text size="2">{`Created on: ${createdAt.toLocaleString()}`}</Text>
      <Text size="2">{`Last updated: ${updatedAt.toLocaleString()}`}</Text>
    </Flex>
  );
}

export default IssueSubheading;
