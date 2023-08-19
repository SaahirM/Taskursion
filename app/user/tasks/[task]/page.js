import Link from "next/link";

export default function Task({params: {task}}) {
  return (
    <main>
      <h1>Task # {task}</h1>
      <Link href={"/user"}>Back</Link>
    </main>
  )
}
