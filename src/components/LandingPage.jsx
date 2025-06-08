"use client";

import { Box, Button, ButtonGroup, Typography, useMediaQuery } from "@mui/material";
import PlainBorderHeader from "./BorderHeaders/PlainBorderHeader";
import Link from "next/link";
import ThemeChangeBtn from "../app/theme/ThemeChangeBtn";

export default function LandingPage() {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <PlainBorderHeader>
            <ThemeChangeBtn />
            <Typography
                variant="h1"
                sx={{
                    textAlign: 'center',
                    mt: '33vh'
                }}
            >
                Taskursion
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 4
                }}
            >
                <ButtonGroup
                    variant='contained'
                    orientation={isSmallScreen ? 'vertical' : 'horizontal'}
                    fullWidth={isSmallScreen ? true : false}
                >
                    <Button
                        size='large'
                        sx={{
                            px: 8,
                            py: { xs: 3, sm: 1, md: 2 },
                            fontSize: { xs: '1.5rem', sm: '1.2rem' }
                        }}
                        LinkComponent={Link}
                        href="/signup"
                    >
                        Signup
                    </Button>
                    <Button
                        size='large'
                        sx={{
                            px: 8,
                            py: { xs: 3, sm: 1, md: 2 },
                            fontSize: { xs: '1.5rem', sm: '1.2rem' }
                        }}
                        LinkComponent={Link}
                        href="/login"
                    >
                        Login
                    </Button>
                </ButtonGroup>
            </Box>
        </PlainBorderHeader>
    );
}