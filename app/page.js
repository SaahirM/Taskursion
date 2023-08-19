"use client";

import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default function Home() {
  return (
    <main>
      <Grid
        container
        alignItems={'center'}
        alignContent={'center'}
        minHeight={'100vh'}
      >
        <Grid xs={12}>
          <Typography variant='h1' textAlign={'center'}>Taskursion</Typography>
        </Grid>

        <Grid xs={12} sm={6}>
          <Button size='large' fullWidth href='/signup'>Signup</Button>
        </Grid>

        <Grid xs={12} sm={6}>
          <Button size='large' fullWidth href='/login'>Login</Button>
        </Grid>
      </Grid>
    </main>
  )
}
