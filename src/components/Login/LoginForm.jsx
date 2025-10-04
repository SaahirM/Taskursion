import { Box, Button, CircularProgress, Paper, TextField, Typography, useMediaQuery } from "@mui/material";
import ProviderLoginButtons from "./ProviderLoginButtons";
import { useNetworkRequest } from "../NetworkReqInFlightContextProvider";

export default function LoginForm({ formData, changeHandler, loading }) {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { isRequestInFlight } = useNetworkRequest();

    return (
        <Paper sx={{ p: [2, 3], mt: [1, 2], border: 2 }}>
            <Typography
                variant="h2"
                sx={{
                    textAlign: 'center',
                    mb: [1, 2]
                }}>Login</Typography>
            <Typography variant='body2'>This page won't work if you have cookies disabled</Typography>
            <TextField
                fullWidth
                required
                variant='filled'
                label="Email"
                name="email"
                type='email'
                margin={isSmallScreen ? 'dense' : 'normal'}
                size={isSmallScreen ? 'small' : 'medium'}
                value={formData.email}
                onChange={changeHandler}
            />
            <TextField
                fullWidth
                required
                variant='filled'
                label="Password"
                name="pass"
                type='password'
                margin={isSmallScreen ? 'dense' : 'normal'}
                size={isSmallScreen ? 'small' : 'medium'}
                value={formData.pass}
                onChange={changeHandler}
            />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end'
                }}>
                <Box
                    sx={{
                        width: { xs: '100%', sm: 'auto' },
                        position: 'relative'
                    }}>    
                    <Button
                        type='submit'
                        variant='contained'
                        sx={{ mt: 2, px: 5 }}
                        fullWidth
                        disabled={isRequestInFlight}
                        color='secondary'
                    >
                        Login
                    </Button>
                    {loading &&
                        <CircularProgress color='secondary' sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px'
                        }} />
                    }
                </Box>
            </Box>
            
            <ProviderLoginButtons />
        </Paper>
    );
}