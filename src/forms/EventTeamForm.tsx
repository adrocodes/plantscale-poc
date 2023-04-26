export const EventTeamForm = () => {
  return (
    <form>
      <h2 className="text-lg font-bold mb-2">Team Event</h2>
      <label htmlFor="etf-name" className="block">
        Event Name
      </label>
      <input type="text" name="etf-name" required />
      <label htmlFor="etf-team" className="block mt-3">
        Team Name
      </label>
      <input type="text" name="etf-team" required />
      <button type="submit" className="px-5 py-3 bg-blue-700 text-white mt-3">
        Create
      </button>
    </form>
  );
};
