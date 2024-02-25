import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Link from "next/link";

export default function TaskGroupCard({ taskGroup }) {
    return (<Card elevation={4}>
        <CardActionArea href={`/home/task/${taskGroup._id.task_id}`} LinkComponent={Link}>
            <CardContent>
                <Typography variant='h4' component='h3' noWrap>{taskGroup.task_title}</Typography>
                <Typography
                    variant='body1'
                    
                    // Cut text off if it exceeds four lines. Code adapted from:
                    // https://stackoverflow.com/a/72279983
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "4",
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {taskGroup.task_desc}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>);
}