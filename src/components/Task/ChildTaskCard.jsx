import { ButtonBase, Checkbox } from "@mui/material";
import Grid from '@mui/material/Grid';
import NextLink from "next/link";
import { useState } from "react";

export default function ChildTaskCard({ childTask, saveTask }) {
    const [completed, setCompleted] = useState(childTask.task_completed);

    const handleChildCompletionChange = e => {
        setCompleted(e.target.checked);
        saveTask({ ...childTask, task_completed: e.target.checked });
    }

    return (
        <Grid container sx={{
            width: '100%'
        }}>
            <Grid
                size='auto'
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <Checkbox
                    checked={completed}
                    onChange={handleChildCompletionChange}
                    aria-label="Mark subtask as completed"
                />
            </Grid>
            <Grid
                size="grow"
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <ButtonBase
                    sx={theme => ({
                        ...theme.typography.body1,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'start',
                        px: 1,
                        py: 1,
                        lineHeight: 1.3,
                        ':hover': {
                            bgcolor: theme.vars.palette.action.hover
                        }
                    })}
                    href={`/home/task/${childTask._id.task_id}`}
                    LinkComponent={NextLink}
                >
                    {childTask.task_title}
                </ButtonBase>
            </Grid>
        </Grid>
    );
}