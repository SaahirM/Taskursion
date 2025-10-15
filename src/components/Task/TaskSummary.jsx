import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ToastContext } from "../ToastContextProvider";
import SummarizeButton from "./SummarizeButton";
import TaskSummaryBox from "./TaskSummaryBox";

export default function TaskSummary({ task, setTask, userAiUsagePromise }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [typing, setTyping] = useState(false);
    const [userRemainingAiUses, setUserRemainingAiUses] = useState(null);

    const toast = useContext(ToastContext);

    const userRemainingAiPercent = userRemainingAiUses
        ? Math.round((userRemainingAiUses / process.env.NEXT_PUBLIC_USER_MONTHLY_AI_USES) * 100)
        : 0;

    const handleGenerate = async () => {
        setDialogOpen(false);
        setGenerating(true);

        await fetch(`/api/task/${task._id.task_id}/summary`, {
            method: 'POST'
        }).then(async res => {
            if (res.status === 404) {
                throw new Error("Task could not be summarized. Task may have been deleted");
            } else if (!res.ok) {
                const error = await res.text();
                if (error !== "") {
                    throw new Error(error);
                }
                throw new Error(`Server responded with a ${res.status} status code`);
            }

            return res.json();
        }).then(res => {
            setTask({
                ...task,
                task_ai_summary: {
                    text: res.aiSummary,
                    wasPromptTruncated: res.isPromptTruncated,
                    generated_at: res.generatedAt,
                }
            });
            setTyping(true);
            setUserRemainingAiUses(uses => uses - 1);
        }).catch(e => {
            const message = e.message ??
                "An unexpected error occurred while communicating with the server";
            toast(message);
        }).finally(() => { setGenerating(false); });
    }

    useEffect(() => {
        if (!userAiUsagePromise) return;        
        userAiUsagePromise.then(setUserRemainingAiUses);
    }, [userAiUsagePromise]);

    return (<>
        <Grid container sx={{ my: 2 }} rowSpacing={1} columnSpacing={2}>
            <Grid size={{ xs: 12, sm: 'auto' }}>
                <SummarizeButton
                    onClick={() => setDialogOpen(true)}
                    disabled={userRemainingAiUses === null || userRemainingAiUses === 0}
                />
            </Grid>
            <Grid size={{ xs: 12, sm: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <CircularProgress size={25} variant="determinate" value={userRemainingAiPercent} color="info" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                        {userRemainingAiUses ?? 0} <span aria-label="of">/</span> {process.env.NEXT_PUBLIC_USER_MONTHLY_AI_USES}{' '}
                        summaries remaining
                    </Typography>
                </Box>
            </Grid>
        </Grid>

        <TaskSummaryBox
            generating={generating}
            summary={task.task_ai_summary}
            typing={typing}
            onTypingComplete={() => setTyping(false)}
        />

        <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            aria-labelledby="ai-summary-dialog-title"
            maxWidth="md"

            sx={{ '& .MuiDialog-paper': { border: 2 } }}
        >
            <DialogTitle id="ai-summary-dialog-title" variant="h2">Generate AI summary?</DialogTitle>

            <DialogContent>
                <Typography>Users can create upto 5 summaries every month. AI summaries may not be accurate.</Typography>

                {task.task_ai_summary && <Typography color="error" sx={{ mt: 1 }}>
                    An AI summary of this task has already been generated. Generating a new summary will overwrite the existing summary.
                </Typography>}
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={() => { setDialogOpen(false); }}>Cancel</Button>
                <Button variant="contained" onClick={handleGenerate} autoFocus>Generate</Button>
            </DialogActions>
        </Dialog>

    </>);
}