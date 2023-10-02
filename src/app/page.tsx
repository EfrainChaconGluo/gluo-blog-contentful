import { Root } from "@/types";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/blog");
  const { items } = (await res.json()) as Root;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {items.map((item) => (
        <article key={item.sys.id}>{item.fields.title}</article>
      ))}
    </main>
  );
}
