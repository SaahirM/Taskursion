import { Box, Button, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function LoginForm({ formData, formError, handlers }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    
    return (<Paper sx={{ p: 3, mt: [1, 3], border: 2, borderRadius: theme.shape.borderRadius }}>
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
    </Paper>);
}