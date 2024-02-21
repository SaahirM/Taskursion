import Task from "@/src/components/Task";

export default function TaskPage({ params: { taskId } }) {
    return (
        <main>
            <Task taskId={taskId} />
        </main>
    );
}
