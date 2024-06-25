import { Card } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  description: string;
}

function IssueMdDescription({ description }: Props) {
  return (
    <Card className="prose dark:prose-invert">
      <ReactMarkdown>{description}</ReactMarkdown>
    </Card>
  );
}

export default IssueMdDescription;
