import { AutoAwesomeRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ToastContext } from "../ToastContextProvider";

export default function TaskSummary({ task, setTask }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [generating, setGenerating] = useState(false);

    const toast = useContext(ToastContext);

    const summaryGeneratedDate = task.task_ai_summary?.generated_at ?
        (new Date(task.task_ai_summary.generated_at)).toLocaleString() : null;

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
        }).catch(e => {
            const message = e.message ??
                "An unexpected error occurred while communicating with the server";
            toast(message);
        }).finally(() => { setGenerating(false); });
    }

    return (<>
        <Grid container sx={{ my: 2, mx: 1 }} rowSpacing={1} columnSpacing={2}>
            <Grid size={{ xs: 12, sm: 'auto' }}>
                <Button
                    startIcon={<AutoAwesomeRounded />}
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => setDialogOpen(true)}
                >
                    Summarize with AI
                </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <CircularProgress size={25} variant="determinate" value={80} color="info" sx={{ mr: 1 }} />
                    <Typography variant="body2">4 <span aria-label="of">/</span> 5 summaries remaining</Typography>
                    {/* TODO update summaries remaining */}
                </Box>
            </Grid>
        </Grid>

        {(generating || task.task_ai_summary) && <Paper sx={{ p: 1 }}>
            {generating && <Typography>Summarizing...</Typography>}
            {task.task_ai_summary && (<>
                <Typography variant='h4' component='h2'>AI Summary</Typography>
                <Typography>{task.task_ai_summary.text}</Typography>
                <Typography variant="body2" color='textSecondary'>Generated {summaryGeneratedDate}</Typography>
            </>)}
        </Paper>}

        <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            aria-labelledby="ai-summary-dialog-title"
            maxWidth="md"

            sx={{ '& .MuiDialog-paper': { border: 2 } }}
        >
            <DialogTitle id="ai-summary-dialog-title" variant="h2">Generate AI summary?</DialogTitle>

            <DialogContent>
                Users may create upto 5 summaries every month. AI summaries may not be accurate.
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" onClick={() => { setDialogOpen(false); }}>Cancel</Button>
                <Button variant="contained" onClick={handleGenerate} autoFocus>Generate</Button>
            </DialogActions>
        </Dialog>

    </>);
}