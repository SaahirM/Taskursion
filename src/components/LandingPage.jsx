"use client";

import { Box, Button, ButtonGroup, Typography, useMediaQuery } from "@mui/material";
import PlainBorderHeader from "./BorderHeaders/PlainBorderHeader";
import Link from "next/link";
import ThemeChangeBtn from "../app/theme/ThemeChangeBtn";

export default function LandingPage() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (<PlainBorderHeader>
        <ThemeChangeBtn />
        <Typography textAlign={'center'} mt='33vh' variant="h1">Taskursion</Typography>
        <Box width={'100%'} display={'flex'} justifyContent={'center'} mt={4}>
            <ButtonGroup
                variant='contained'
                orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                fullWidth={isSmallScreen ? true : false}
            >
                <Button
                    size='large'
                    sx={{ px: 8, py: { xs: 3, sm: 1, md: 2 } }}
                    LinkComponent={Link}
                    href="/signup"
                >
                    Signup
                </Button>
                <Button
                    size='large'
                    sx={{ px: 8, py: { xs: 3, sm: 1, md: 2 } }}
                    LinkComponent={Link}
                    href="/login"
                >
                    Login
                </Button>
            </ButtonGroup>
        </Box>
    </PlainBorderHeader>);
}