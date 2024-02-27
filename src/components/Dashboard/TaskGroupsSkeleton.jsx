import { Paper, Skeleton } from "@mui/material";

export default function TaskGroupSkeleton() {
    return <Paper sx={{ p: 3, m: 1, border: 2 }}>
        <Skeleton variant='rounded' height={100} animation='wave' />
    </Paper>;
}