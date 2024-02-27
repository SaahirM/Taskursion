import Grid from '@mui/material/Unstable_Grid2';
import AccountInfoSummary from './AccountInfoSummary';
import TaskGroups from './TaskGroups';
import { Suspense } from 'react';
import TaskGroupSkeleton from './TaskGroupsSkeleton';

export default function Dashboard() {
    return (<main>
        <Grid container direction={'row-reverse'}>
            <Grid xs={12} md={4}>
                <AccountInfoSummary />
            </Grid>
            <Grid xs={12} md={8}>
                <Suspense fallback={<TaskGroupSkeleton />}>
                    <TaskGroups />
                </Suspense>
            </Grid>
        </Grid>
    </main>);
}