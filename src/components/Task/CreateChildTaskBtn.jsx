import { AddBoxRounded } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

const TRANSITION_TIMEOUT = 500; //ms

export default function CreateChildTaskBtn({ parentId, setChildTasks }) {
    const [title, setTitle] = useState("");
    const [checked, setChecked] = useState(false);
    const [transitionText, setTransitionText] = useState("");

    const addTask = async () => {
        if (title === "") return;

        setTransitionText(title);
        setTimeout(() => setTransitionText(""), TRANSITION_TIMEOUT);

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

    const Transition = () => (<Typography
        position='absolute'
        left={theme => theme.spacing(5/3)}
        top={theme => theme.spacing(2)}
        width={'90%'}
        noWrap
        display={transitionText === "" ? 'none' : undefined}

        sx={{
            animation: `${TRANSITION_TIMEOUT}ms ease-out 1 fade-down`,
            '@keyframes fade-down': {
                from: { opacity: 1, transform: 'translateY(0)' },
                to: { opacity: 0, transform: 'translateY(200px)' }
            }
        }}
    >
        {transitionText}
    </Typography>);

    return (<Card elevation={3} sx={{ mt: 3, mb: 1, overflow: 'visible' }}>
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
                        <Transition />
                    </FormControl>
                </Grid>
            </Grid>
        </CardContent>
    </Card>);
}