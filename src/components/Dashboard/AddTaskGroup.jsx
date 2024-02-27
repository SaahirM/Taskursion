"use client";

import { Alert, Button, Card, CardContent, Snackbar, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTaskGroup() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const [isSbOpen, setIsSbOpen] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const addTask = () => {
        if (title === "") return;

        fetch("/api/task", {
            method: 'POST',
            body: JSON.stringify({
                task_parent_id: null,
                task_title: title,
                task_desc: desc
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
            .then(() => {
                setTitle("");
                setDesc("");
                router.refresh();
            })
            .catch(e => {
                console.log(e);
                if (e.message) {
                    setError(e.message);
                    setIsSbOpen(true);
                } else {
                    setError("An unexpected error occurred while creating this task");
                    setIsSbOpen(true);
                }
            });
    };

    return (<Card elevation={0} sx={{ height: "100%", border: "1px dashed black" }}>
        <CardContent sx={{ ':last-child': { pb: 'unset', p: 2 } }}>
            <TextField
                label="Task title"
                fullWidth
                margin='dense'
                size='small'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <TextField
                label="Task description"
                fullWidth
                margin='dense'
                size='small'
                multiline
                rows={3}
                value={desc}
                onChange={e => setDesc(e.target.value)}
            />
            <Button
                size='small'
                sx={{ fontSize: ["0.7rem", "0.9rem"] }}
                onClick={addTask}
            >
                Create new root task
            </Button>

            <Snackbar
                open={isSbOpen}
                autoHideDuration={9000}
                onClose={setIsSbOpen.bind(null, false)}
            >
                <Alert onClose={setIsSbOpen.bind(null, false)} severity='error' variant='filled'>
                    {error}
                </Alert>
            </Snackbar>
        </CardContent>
    </Card>);
}