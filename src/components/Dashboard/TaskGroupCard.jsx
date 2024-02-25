import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Link from "next/link";

export default function TaskGroupCard({ taskGroup }) {
    // Cut text off if it is more than "lines" lines. Code adapted from:
    // https://stackoverflow.com/a/72279983
    const cutOffTextStyles = lines => {return {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: lines,
            WebkitBoxOrient: "vertical"
    }}

    return (<Card elevation={4}>
        <CardActionArea href={`/home/task/${taskGroup._id.task_id}`} LinkComponent={Link}>
            <CardContent>
                <Typography variant='h4' component='h3' sx={cutOffTextStyles(2)}>{taskGroup.task_title}</Typography>
                <Typography
                    variant='body1'
                    sx={cutOffTextStyles(4)}
                >
                    {taskGroup.task_desc}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>);
}