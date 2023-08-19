import Link from "next/link";

export default function Settings() {
  return (
    <main>
      <h1>Account settings</h1>
      <Link href={"/user"}>Back</Link>
    </main>
  )
}
