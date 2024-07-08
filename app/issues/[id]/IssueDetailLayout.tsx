import { Issue } from "@prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import AssignUserList from "./AssignUserList";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueHeading from "./IssueHeading";
import IssueMdDescription from "./IssueMdDescription";
import IssueSubheading from "./IssueSubheading";

interface Props {
  issue: Issue;
}

function IssueDetailLayout({ issue }: Props) {
  return (
    <>
      <IssueHeading title={issue.title} status={issue.status} />
      <IssueSubheading
        createdAt={issue.createdAt}
        updatedAt={issue.updatedAt}
      />
      <Grid columns={{ initial: "1", md: "2" }} gap="5" mt="4">
        <Box>
          <IssueMdDescription description={issue.description} />
        </Box>
        <Flex gap="3" className="flex-col sm:flex-row">
          <AssignUserList issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Grid>
    </>
  );
}

export default IssueDetailLayout;
