"use client";

import { useTheme } from "@emotion/react";
import { Box, Button, Container, Paper, TextField, Typography, useMediaQuery } from "@mui/material";

export default function Login() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (<Container
        maxWidth='sm'
        component='form'
    >
        <Paper sx={{ p: 3, mt: [1, 3], border: 2, borderRadius: theme.shape.borderRadius }}>
            <Typography variant="h2" textAlign='center' mb={[1, 2]}>Login</Typography>
            <TextField
                fullWidth
                variant='filled'
                label="Email"
                type='email'
                margin={isSmallScreen ? 'dense' : 'normal'}
                size={isSmallScreen ? 'small' : 'medium'}
            />
            <TextField
                fullWidth
                variant='filled'
                label="Password"
                type='password'
                margin={isSmallScreen ? 'dense' : 'normal'}
                size={isSmallScreen ? 'small' : 'medium'}
            />

            <Box display='flex' justifyContent='end'>
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ mt: 2, px: 5 }}
                    fullWidth={isSmallScreen ? true : false}
                    color='secondary'
                >
                    Login
                </Button>
            </Box>
        </Paper>
    </Container>);
}