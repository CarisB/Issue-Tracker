"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function AssignUserList() {
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

  return (
    <Select.Root
      disabled={session.status !== "authenticated" || isPending || !!error}
    >
      <Select.Trigger placeholder="Assign to..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssignUserList;
