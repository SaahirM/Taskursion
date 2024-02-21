import Link from "next/link";
import BorderHeader from "./BorderHeaders/BorderHeader";
import BorderLogo from "./BorderHeaders/BorderLogo";

export default function Task({ taskId }) {
    return (<BorderHeader
        primaryHeaderComponent={{ component: <p>test</p>, linkTarget: "/home" }}
        secondaryHeaderComponent={<BorderLogo />}
    >
        <h1>Task # {taskId}</h1>
        <Link href={"/user"}>Back</Link>
    </BorderHeader>);
}