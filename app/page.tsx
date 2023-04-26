import Link from "next/link";

import { prisma } from "../src/prisma";

export default async function Home() {
  const users = await prisma.userMeta.findMany({ take: 2 });

  await prisma.$disconnect();

  return (
    <main>
      {users.map((value) => (
        <div
          key={value.id}
          className="p-4 rounded-md bg-slate-100 border-slate-300 border mt-4"
        >
          <p>ID: {value.id}</p>
          <p>Auth ID: {value.auth_id}</p>
          <p>Customer ID: {value.customer_id}</p>
          <Link href={`/user/${value.id}`} className="text-blue-500 underline">
            Go to user
          </Link>
        </div>
      ))}
    </main>
  );
}
