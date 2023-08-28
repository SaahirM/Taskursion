import Link from "next/link";

export default function Task({taskId}) {
  return (<>
    <h1>Task # {taskId}</h1>
    <Link href={"/user"}>Back</Link>
  </>);
}