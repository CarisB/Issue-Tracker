import { patchIssueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Must be authenticated
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description, status, assignedToUserId } = body;

  if (assignedToUserId)
    try {
      const user = await prisma.user.findUnique({
        where: { id: assignedToUserId },
      });
    } catch (RecordNotFoundError) {
      return NextResponse.json(
        { error: "AssignedToUserId: User not found" },
        { status: 404 }
      );
    }

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        description,
        status,
        assignedToUserId,
      },
    });

    return NextResponse.json(updatedIssue);
  } catch (RecordNotFoundError) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Must be authenticated
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.issue.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "Issue deleted" });
  } catch (RecordNotFoundError) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
}
