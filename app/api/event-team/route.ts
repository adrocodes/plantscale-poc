import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { prisma } from "src/prisma";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const name = data.get("etf-name")!.toString();
  const team = data.get("etf-team")?.toString();
  const teamId = data.get("etf-existing-team")?.toString();
  const id = data.get("etf-user-id")!.toString();

  if (!team && !teamId) {
    return new Response("Need team information", {
      status: 400,
    });
  }

  await prisma.event.create({
    data: {
      name,
      userMeta: {
        connect: {
          id: Number(id),
        },
      },
      eventTeam: {
        connectOrCreate: {
          where: {
            id: Number(teamId),
          },
          create: {
            name: team || "UNKNOWN",
            userMeta: {
              connect: {
                id: Number(id),
              },
            },
          },
        },
      },
    },
  });

  await prisma.$disconnect();

  redirect(`http://localhost:3000/user/${id}`);
}
