import { Flex } from "@radix-ui/themes";
import IssueOverview from "./IssueOverview";
import LatestIssues from "./LatestIssues";

export default function Home() {
  return (
    <Flex direction="column" gap="2">
      <LatestIssues />
      <IssueOverview />
    </Flex>
  );
}
