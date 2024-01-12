import Link from "next/link";

export default function Dashboard() {
    return (<>
        <h1>After login</h1>
        <Link href={"/"}>Logout</Link>
        <Link href={"/user/settings"}>Settings</Link>
        <Link href={"/user/tasks/1"}>Task 1</Link>
    </>);
}