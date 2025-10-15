const parsedMaxChars = parseInt(process.env.AI_TASK_SUMMARY_MAX_CHARS);
const MAX_CHARS = isNaN(parsedMaxChars) ? 40_000 : parsedMaxChars;

export default function stringifyTasks(tasks) {
    const jsonTasks = tasks
        .map(task => ({
            id: task._id.task_id,
            parent_id: task.task_parent_id,
            title: task.task_title,
            desc: task.task_desc
        }))
        .map(JSON.stringify);

    let totalChars = 0;
    let stringTasks = "[" + jsonTasks[0];
    for (let i = 1; i < jsonTasks.length; i++) {
        const nextTask = jsonTasks[i];

        if (totalChars + nextTask.length > MAX_CHARS) {
            stringTasks += ", (truncated...)";
            isPromptTruncated = true;
            break;
        }

        stringTasks += "," + nextTask;
        totalChars += nextTask.length;
    }
    stringTasks += "]";

    return { stringTasks, isPromptTruncated };
}