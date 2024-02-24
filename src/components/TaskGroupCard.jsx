import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Link from "next/link";

export default function TaskGroupCard({ taskGroup }) {
    return (<Card elevation={4}>
        <CardActionArea href={`/home/task/${taskGroup._id.task_id}`} LinkComponent={Link}>    
            <CardContent>
                <Typography variant='h4' component='h3'>{taskGroup.task_title}</Typography>
                <Typography variant='body1'>{taskGroup.task_desc}</Typography>
            </CardContent>
        </CardActionArea>
    </Card>);
}