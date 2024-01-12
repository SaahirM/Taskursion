import Task from "@/src/components/Task";

export default function TaskPage({ params: { task } }) {
    return (
        <main>
            <Task taskId={task} />
        </main>
    );
}
