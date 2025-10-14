import { AutoAwesomeRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { useState } from "react";

export default function TaskSummary({ task }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleGenerate = () => {
        // TODO call API to generate summary
        setDialogOpen(false);
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