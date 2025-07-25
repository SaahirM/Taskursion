import { AddBoxRounded } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Checkbox, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useContext, useState } from "react";
import { ToastContext } from "../ToastContextProvider";

const TRANSITION_TIMEOUT = 500; //ms

export default function CreateChildTaskBtn({ parentId, setChildTasks }) {
    const [title, setTitle] = useState("");
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transitionText, setTransitionText] = useState("");

    const toast = useContext(ToastContext);

    const addTask = async () => {
        if (title === "") return;

        setTransitionText(title);
        setTimeout(() => setTransitionText(""), TRANSITION_TIMEOUT);

        setLoading(true);
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
                setLoading(false);
            })
            .catch(e => {
                const message = e.message ??
                    "An unexpected error occurred while communicating with the server";
                toast(message);
            });
    };

    const Transition = () => (<Typography
        noWrap
        sx={{
            position: 'absolute',
            left: theme => theme.spacing(5/3),
            top: theme => theme.spacing(2),
            width: '90%',
            display: transitionText === "" ? 'none' : undefined,
            animation: `${TRANSITION_TIMEOUT}ms ease-out 1 fade-down`,

            '@keyframes fade-down': {
                from: { opacity: 1, transform: 'translateY(0)' },
                to: { opacity: 0, transform: 'translateY(200px)' }
            }
        }}>
        {transitionText}
    </Typography>);

    return (
        <Card elevation={3} sx={{ mt: 3, mb: 1, overflow: 'visible' }}>
            <CardHeader sx={{ pb: 0 }} title="Create subtask" />
            <CardContent sx={{ py: 1, ':last-child': { pb: 2 } }}>
                <Grid container sx={{
                    gap: 1
                }}>
                    <Grid
                        size='auto'
                        sx={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                        <Checkbox
                            edge='start'
                            size='large'
                            checked={checked}
                            onChange={e => setChecked(e.target.checked)}
                        />
                    </Grid>
                    <Grid size="grow">
                        <FormControl fullWidth>
                            <InputLabel htmlFor="create-subtask-input">Title</InputLabel>
                            <OutlinedInput
                                id="create-subtask-input"
                                label="Title"
                                placeholder="Plan everything out..."
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                onKeyDown={({ key }) => { if (key === 'Enter') addTask(); }}
                                endAdornment={<InputAdornment position='end'>
                                    {loading
                                        ? <CircularProgress size={20} />
                                        : <IconButton edge='end' aria-label="Add subtask" onClick={addTask}>
                                            <AddBoxRounded />
                                        </IconButton>
                                    }
                                </InputAdornment>}
                            />
                            <Transition />
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}