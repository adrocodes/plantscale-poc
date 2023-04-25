import { prisma } from "../../../src/prisma";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await prisma.userMeta.findUniqueOrThrow({
    where: {
      id: Number(params.id),
    },
  });

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">User page: {user.id}</h1>
    </main>
  );
}
