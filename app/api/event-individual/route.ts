import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { prisma } from "src/prisma";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const name = data.get("eif-name");
  const id = data.get("eif-user-id");

  await prisma.event.create({
    data: {
      name: name?.toString() || "UNKNOWN",
      userMeta: {
        connect: {
          id: Number(id),
        },
      },
    },
  });

  await prisma.$disconnect();

  redirect(`http://localhost:3000/user/${id}`);
}
