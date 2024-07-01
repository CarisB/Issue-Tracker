import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  // Must be authenticated
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}
