"use client";

import ErrorMessage from "@/app/_components/ErrorMessage";
import Spinner from "@/app/_components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Component1Icon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdDangerous } from "react-icons/md";
import { z } from "zod";

type IssueForm = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

function IssueForm({ issue }: Props) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  // Dynamic import because SimpleMDE can't use SSR
  const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
  });

  const onSubmit = handleSubmit(async (data: IssueForm) => {
    try {
      setSubmitting(true);

      let path, method;

      if (issue) {
        // If issue exists, update. Otherwise, create.
        path = `/api/issues/${issue.id}`;
        method = "PATCH";
      } else {
        path = "/api/issues";
        method = "POST";
      }
      const res = await fetch(path, {
        method: method,
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
        <TextField.Root
          defaultValue={issue?.title}
          {...register("title")}
          placeholder="Issue title"
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name={"description"}
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description of the Issue"
              {...field}
              ref={null}
            />
          )}
        />
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          variant="soft"
        >
          <Component1Icon />
          {issue ? "Update Issue" : "Create Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
