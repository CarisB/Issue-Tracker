import { auth } from "@/auth";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";

async function AssignUserList() {
  let users: User[] = [];

  try {
    users = await fetch(process.env.URL + "/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error: any) {
    throw new Error(error.message);
  }

  const session = await auth();

  return (
    <Select.Root disabled={!session}>
      <Select.Trigger placeholder="Assign to..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
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
