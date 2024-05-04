import { AddBoxRounded } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

export default function CreateChildTaskBtn({ parentId, setChildTasks }) {
    const [title, setTitle] = useState("");
    const [checked, setChecked] = useState(false);

    const addTask = () => {
        if (title === "") return;

        fetch("/api/task", {
            method: 'POST',
            body: JSON.stringify({
                task_parent_id: parentId,
                task_title: title,
                task_desc: "",
                task_completed: checked
            })
        })
            .then(async res => {
                if (!res.ok) {
                    const error = await res.text();
                    if (error !== "") {
                        throw new Error(error);
                    }
                    throw new Error(`Server responded with a ${res.status} status code`);
                }
                return await res.json();
            })
            .then(data => {
                setChildTasks(oldChildTasks => [...oldChildTasks, data]);
                setTitle("");
                setChecked(false);
            })
            .catch(e => {
                const message = e.message ??
                    "An unexpected error occurred while communicating with the server";
                toast(message);
            });
    };

    return (<Card elevation={3} sx={{ mt: 3, mb: 1 }}>
        <CardHeader sx={{ pb: 0 }} title="Create subtask" />
        <CardContent sx={{ py: 1, ':last-child': { pb: 2 } }}>
            <Grid container gap={1}>
                <Grid xs='auto' display='flex' alignItems='center'>
                    <Checkbox
                        edge='start'
                        size='large'
                        checked={checked}
                        onChange={e => setChecked(e.target.checked)}
                    />
                </Grid>
                <Grid xs>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="create-subtask-input">Title</InputLabel>
                        <OutlinedInput
                            id="create-subtask-input"
                            label="Title"
                            placeholder="Plan everything out..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            endAdornment={<InputAdornment position='end'>
                                <IconButton edge='end' aria-label="Add subtask" onClick={addTask}>
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