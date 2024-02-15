import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export default function TaskGroupCard({ taskGroup }) {
    return (<Card elevation={4}>
        <CardContent>
            <Typography variant='h4' component='h3'>{taskGroup.task_title}</Typography>
            <Typography variant='body1'>{taskGroup.task_desc}</Typography>
        </CardContent>
    </Card>);
}