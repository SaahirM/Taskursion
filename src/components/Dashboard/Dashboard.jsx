import Grid from '@mui/material/Grid';
import AccountInfoRegion from './AccountInfoRegion';
import TaskGroups from './TaskGroups';
import { Suspense } from 'react';
import TaskGroupSkeleton from './TaskGroupsSkeleton';

export default function Dashboard() {
    return (<main>
        <Grid container direction={'row-reverse'}>
            <Grid size={{ xs: 12, md: 4 }}>
                <AccountInfoRegion />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
                <Suspense fallback={<TaskGroupSkeleton />}>
                    <TaskGroups />
                </Suspense>
            </Grid>
        </Grid>
    </main>);
}