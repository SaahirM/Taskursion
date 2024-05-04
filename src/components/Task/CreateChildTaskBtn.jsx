import { AddBoxRounded } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function CreateChildTaskBtn({ addTask }) {
    return (<Card elevation={3} sx={{ mt: 3, mb: 1 }}>
        <CardHeader sx={{ pb: 0 }} title="Create subtask" />
        <CardContent sx={{ py: 1 }}>
            <Grid container gap={1}>
                <Grid xs='auto'>
                    <Checkbox edge='start' size='large' />
                </Grid>
                <Grid xs>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="create-subtask-input">Title</InputLabel>
                        <OutlinedInput
                            id="create-subtask-input"
                            label="Title"
                            placeholder="Plan everything out..."
                            endAdornment={<InputAdornment position='end'>
                                <IconButton edge='end' aria-label="Add subtask">
                                    <AddBoxRounded />
                                </IconButton>
                            </InputAdornment>}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </CardContent>
    </Card>);
}