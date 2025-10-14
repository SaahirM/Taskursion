import { AutoAwesomeRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

export default function TaskSummary({ task }) {
    return (<Grid container sx={{ my: 2, mx: 1 }} rowSpacing={1} columnSpacing={2}>
        <Grid size={{ xs: 12, sm: 'auto' }}>
            <Button
                startIcon={<AutoAwesomeRounded />}
                variant="contained"
                color="secondary"
                size="small"
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
    </Grid>);


    // <Typography variant="caption">AI summaries may not be accurate. Users can create upto 5 summaries every month</Typography>
}