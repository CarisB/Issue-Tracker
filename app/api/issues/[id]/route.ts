import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const updatedIssue = await prisma.issue.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
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
  try {
    await prisma.issue.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "Issue deleted" });
  } catch (RecordNotFoundError) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
}
