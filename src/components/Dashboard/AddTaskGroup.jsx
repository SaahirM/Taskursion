"use client";

import { validateTaskDesc, validateTaskTitle } from "@/src/util/validation";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ToastContext } from "../ToastContextProvider";

export default function AddTaskGroup() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descError, setDescError] = useState("");

    const router = useRouter();
    const toast = useContext(ToastContext);

    const handleTitleChange = e => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        if (newTitle === "") {
            setTitleError("");
            return;
        }
        
        setTitleError(validateTaskTitle(newTitle));
    }

    const handleDescChange = e => {
        const newDesc = e.target.value;
        setDesc(newDesc);

        if (newDesc === "") {
            setDescError("");
            return;
        }
        
        setDescError(validateTaskDesc(newDesc));
    }

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
                const msg = e.message ?? "An unexpected error occurred while creating this task";
                toast(msg)
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
                onChange={handleTitleChange}
                error={titleError !== ""}
                helperText={titleError}
                required
            />
            <TextField
                label="Task description"
                fullWidth
                margin='dense'
                size='small'
                multiline
                rows={3}
                value={desc}
                onChange={handleDescChange}
                error={descError !== ""}
                helperText={descError}
            />
            <Button
                size='small'
                sx={{ fontSize: ["0.7rem", "0.9rem"] }}
                onClick={addTask}
                disabled={titleError || descError}
            >
                Create new task
            </Button>
        </CardContent>
    </Card>);
}