"use client";

import { Component1Icon } from "@radix-ui/react-icons";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdDangerous } from "react-icons/md";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

function NewIssuePage() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data: IssueForm) => {
    try {
      setSubmitting(true);

      const res = await fetch("/api/issues", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setSubmitting(false);
        throw new Error(
          (await res.json()).message || "An unexpected error has occurred."
        );
      }

      router.push("/issues");
    } catch (e: any) {
      setSubmitting(false);
      setError(e.message || "An unexpected error has occurred.");
    }
  });

  return (
    <div className="w-2/3">
      {error && (
        <Callout.Root color={"red"} className="mb-5">
          <Callout.Icon>
            <MdDangerous />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <h1 className="text-2xl font-bold mb-5">Create a new Issue</h1>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root {...register("title")} placeholder="Issue title" />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name={"description"}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description of the Issue" {...field} />
          )}
        />
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          variant="soft"
        >
          <Component1Icon />
          Create Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
