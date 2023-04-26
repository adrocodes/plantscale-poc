import { EventIndividualForm } from "src/forms/EventIndividualForm";
import { prisma } from "../../../src/prisma";
import { EventTeamForm } from "src/forms/EventTeamForm";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await prisma.userMeta.findUniqueOrThrow({
    where: {
      id: Number(params.id),
    },
  });

  const events = await prisma.event.findMany({
    take: 10,
    where: {
      userMetaId: Number(params.id),
    },
    include: {
      eventTeam: true,
    },
  });

  await prisma.$disconnect();

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">User page: {user.id}</h1>
      <div className="grid grid-cols-2">
        <EventIndividualForm id={params.id} />
        <EventTeamForm />
      </div>
      <hr className="my-8" />
      <h2 className="text-xl font-bold mb-6">User events: {events.length}</h2>
      {events.map((value) => (
        <div
          key={value.id}
          className="p-4 rounded-md bg-slate-100 border-slate-300 border mt-4"
        >
          <p>ID: {value.id}</p>
          <p>Name: {value.name}</p>
          <p>Individual: {value.eventTeam.length === 0 ? "Yes" : "No"}</p>
        </div>
      ))}
    </main>
  );
}
