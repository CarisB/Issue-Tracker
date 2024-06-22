"use client";

import { Component1Icon } from "@radix-ui/react-icons";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const onSubmit = async (data: IssueForm) => {
    try {
      const res = await fetch("/api/issues", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/issues");
    } catch (e: any) {
      console.log(e.message || "An unexpected error has occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-3">
      <h1 className="text-2xl font-bold mb-5">Create a new Issue</h1>
      <TextField.Root {...register("title")} placeholder="Issue title" />
      <Controller
        name={"description"}
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description of the Issue" {...field} />
        )}
      />
      <Button type="submit" variant="soft" className="cursor-pointer">
        <Component1Icon />
        Create Issue
      </Button>
    </form>
  );
}

export default NewIssuePage;
