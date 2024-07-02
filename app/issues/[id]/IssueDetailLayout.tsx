import { Issue, IssueStatus } from "@prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueHeading from "./IssueHeading";
import IssueMdDescription from "./IssueMdDescription";
import IssueSubheading from "./IssueSubheading";
import AssignUserList from "./AssignUserList";

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
      <Grid columns={{ initial: "1", md: "2" }} gap="5" mt="5">
        <Box>
          <IssueMdDescription description={issue.description} />
        </Box>
        <Box className="space-x-3">
          <AssignUserList issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Box>
      </Grid>
    </>
  );
}

export default IssueDetailLayout;
