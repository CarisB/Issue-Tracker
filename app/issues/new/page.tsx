"use client";

import { Component1Icon } from "@radix-ui/react-icons";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

function NewIssuePage() {
  return (
    <div className="w-2/3 space-y-3">
      <h1 className="text-2xl font-bold mb-5">Create a new Issue</h1>
      <TextField.Root placeholder="Issue title" />
      <SimpleMDE placeholder="Description of the Issue" />
      <Button variant="soft">
        <Component1Icon />
        Create Issue
      </Button>
    </div>
  );
}

export default NewIssuePage;
