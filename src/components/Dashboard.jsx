"use client"

import Grid from '@mui/material/Unstable_Grid2';
import AccountInfoSummary from './AccountInfoSummary';
import TaskGroups from './TaskGroups';

export default function Dashboard() {
    return (<main>
        {/* <h1>After login</h1>
        <Button onClick={handleLogout}>Logout</Button>
        <Link href={"/user/settings"}>Settings</Link>
        <Link href={"/user/tasks/1"}>Task 1</Link> */}
        <Grid container direction={'row-reverse'}>
            <Grid xs={12} md={4}>
                <AccountInfoSummary />
            </Grid>
            <Grid xs={12} md={8}>
                <TaskGroups />
            </Grid>
        </Grid>
    </main>);
}