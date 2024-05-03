import { Checkbox, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function ChildTaskCard({ childTask }) {
    return (<Paper square sx={theme => ({
        ':first-of-type': {
            borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`
        },
        ':last-of-type': {
            borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`
        }
    })}>
        <Grid container>
            <Grid xs='auto'>
                <Checkbox />
            </Grid>
            <Grid xs display='flex' alignItems='center'>
                {childTask.task_title}
            </Grid>
        </Grid>
    </Paper>);
}