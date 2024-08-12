import { Paper, Skeleton } from "@mui/material";

export default function AccountInfoSkeleton() {
    return <Paper sx={{ p: 3, m: 1, border: 2 }}>
        <Skeleton variant='rounded' height={66} animation='wave' />
    </Paper>;
}