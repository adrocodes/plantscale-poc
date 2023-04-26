import { prisma } from "src/prisma";

export const EventTeamForm = async ({ id }: { id: string }) => {
  const teams = await prisma.eventTeam.findMany({
    take: 5,
  });

  await prisma.$disconnect();

  return (
    <form method="POST" action="/api/event-team">
      <h2 className="text-lg font-bold mb-2">Team Event</h2>
      <label htmlFor="etf-name" className="block">
        Event Name
      </label>
      <input type="text" name="etf-name" required />
      <label htmlFor="etf-team" className="block mt-3">
        Team Name
      </label>
      <input type="text" name="etf-team" />
      <label htmlFor="etf-existing-team" className="block mt-3">
        Existing Team
      </label>
      <select name="etf-existing-team" className="block">
        <option value="">Select</option>
        {teams.map((value) => (
          <option key={value.id} value={value.id}>
            {value.name}
          </option>
        ))}
      </select>
      <input hidden defaultValue={id} required name="etf-user-id" />
      <button type="submit" className="px-5 py-3 bg-blue-700 text-white mt-3">
        Create
      </button>
    </form>
  );
};
