import Link from "next/link";

export default function Settings() {
  return (<>
    <h1>Account settings</h1>
    <Link href={"/user"}>Back</Link>
  </>);
}