import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { prisma } from "src/prisma";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const name = data.get("etf-name")!.toString();
  const team = data.get("etf-team")?.toString();
  const teamId = data.get("etf-existing-team")?.toString();
  const id = data.get("etf-user-id")!.toString();

  console.log({ name, team, teamId, id });

  await prisma.event.create({
    data: {
      name,
      userMeta: {
        connect: {
          id: Number(id),
        },
      },
      eventTeam: {
        ...(teamId
          ? {
              connect: {
                id: Number(teamId),
              },
            }
          : {
              create: {
                name: team || "UNKOWN",
                userMeta: {
                  connect: {
                    id: Number(id),
                  },
                },
              },
            }),
      },
    },
  });

  await prisma.$disconnect();

  redirect(`http://localhost:3000/user/${id}`);
}