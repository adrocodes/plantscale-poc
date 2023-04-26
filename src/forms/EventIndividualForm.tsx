export const EventIndividualForm = ({ id }: { id: string }) => {
  return (
    <form method="POST" action="/api/event-individual">
      <h2 className="text-lg font-bold mb-2">Individual Event</h2>
      <label htmlFor="eif-name" className="block">
        Name
      </label>
      <input type="text" name="eif-name" required />
      <input hidden defaultValue={id} required name="eif-user-id" />
      <button type="submit" className="px-5 py-3 bg-blue-700 text-white mt-3">
        Create
      </button>
    </form>
  );
};
