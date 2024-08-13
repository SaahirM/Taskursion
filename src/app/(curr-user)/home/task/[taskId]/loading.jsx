"use client";

import BorderHeader from "@/src/components/BorderHeaders/BorderHeader";
import BorderLogo from "@/src/components/BorderHeaders/BorderLogo";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import { Box, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function TaskSkeleton() {
    const backLinkSkeleton = (<>
        <ChevronLeftRounded fontSize='large' />
        <Typography variant='h4' width='100%'>
            <Skeleton animation='wave' />
        </Typography>
    </>);

    return (<BorderHeader
        primaryHeaderComponent={{ component: backLinkSkeleton, linkTarget: '' }}
        secondaryHeaderComponent={{ component: <BorderLogo />, linkTarget: "/home" }}
    >
        <Box p={1} width={{ xs: "100%", lg: "66%" }}>
            <Grid container flexDirection='row-reverse' gap={3}>
                <Grid xs>
                    <Typography variant="h2">    
                        <Skeleton animation='wave' />
                    </Typography>
                    <Skeleton variant='rounded' animation='wave' height={200} />
                </Grid>
                <Grid xs='auto' display='flex' flexDirection='column' alignContent='center'>
                    <Typography variant="h2">    
                        <Skeleton animation='wave' sx={{ width: {
                            // manually configured widths. may look weird on some devices?
                            xs: '1.7rem', sm: '2.2rem', md: '2.4rem', lg: '2.7rem'
                        }} } />
                    </Typography>
                </Grid>
            </Grid>
            <Skeleton variant='rounded' animation='wave' height={300} sx={{ mt: 3 }} />
        </Box>
    </BorderHeader>)
}