"use client";

import { Issue, User } from "@prisma/client";
import { CircleBackslashIcon, PersonIcon } from "@radix-ui/react-icons";
import { Flex, Select, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Toast, { toast, Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}

function AssignUserList({ issue }: Props) {
  const {
    data: users,
    error,
    isPending,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    staleTime: 1000 * 60, // 1 minute,
    retry: 3,
  });

  const session = useSession();

  const [selectedValue, setSelectedValue] = useState(
    issue.assignedToUserId || ""
  );

  const handleValueChange = (userId: string) => {
    const val = userId === "null" ? null : userId;

    fetch(`/api/issues/${issue.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assignedToUserId: val }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to assign user");
      })
      .catch((error) => {
        toast.error(error.message);
        return;
      });

    setSelectedValue(userId);
    toast.success(
      `Assigned to ${users?.find((user) => user.id === userId)?.name}`
    );
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={handleValueChange}
        disabled={session.status !== "authenticated" || isPending || !!error}
      >
        <Select.Trigger placeholder="Assign to...">
          <Flex align="center" gap="2">
            <PersonIcon />
            {users?.find((user) => user.id === selectedValue)?.name ||
              "Assign to..."}
          </Flex>
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item value="null">
              <Text className="flex items-center gap-2">
                Unassign
                <CircleBackslashIcon />
              </Text>
            </Select.Item>
            <Select.Separator />
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
}

export default AssignUserList;
