import HomeBorderHeader from "@/src/components/BorderHeaders/HomeBorderHeader";
import AccountInfoSkeleton from "@/src/components/Dashboard/AccountInfoSkeleton";
import TaskGroupSkeleton from "@/src/components/Dashboard/TaskGroupsSkeleton";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function DashboardSkeleton() {
    return (<HomeBorderHeader linkTarget={'/home'}>
        <main>
            <Grid container direction={'row-reverse'}>
                <Grid xs={12} md={4}>
                    <AccountInfoSkeleton />
                </Grid>
                <Grid xs={12} md={8}>
                    <TaskGroupSkeleton />
                </Grid>
            </Grid>
        </main>
    </HomeBorderHeader>);
}