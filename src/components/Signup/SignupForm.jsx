import { Box, Button, CircularProgress, Paper, TextField, Tooltip, Typography, useMediaQuery } from "@mui/material";
import AltLoginButtons from "../Login/AltLoginButtons";
import { useNetworkRequest } from "../NetworkReqInFlightContextProvider";

export default function SignupForm({ formData, formError, handlers, loading }) {
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const { isRequestInFlight } = useNetworkRequest();

    return (
        <Paper sx={{ p: [2, 3], mt: [1, 2], border: 2 }}>
            <Typography
                variant="h2"
                sx={{
                    textAlign: 'center',
                    mb: [1, 2]
                }}>Create an account</Typography>
            <Typography variant='body2' sx={{
                mb: [2, 1]
            }}>
                Make sure you have cookies enabled or this page won't work. By signing up you agree with
                the use of cookies to keep you logged in.
            </Typography>
            <Typography variant='body2'><strong>Fields marked with an asterisk * are required.</strong></Typography>
            <TextField
                fullWidth
                required
                variant='filled'
                label="Name"
                name="name"
                margin={isSmallScreen ? 'dense' : 'normal'}
                size={isSmallScreen ? 'small' : 'medium'}
                value={formData.name}
                onChange={handlers.name}
                error={formError.name !== ""}
                helperText={formError.name}
            />
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
                onChange={handlers.email}
                error={formError.email !== ""}
                helperText={formError.email}
            />
            <Tooltip
                title="Must have at least 8 characters, a symbol, a number, an uppercase character,
                and a lowercase character"
                disableHoverListener
                placement='top-start'
            >
                <TextField
                    fullWidth
                    required
                    variant='filled'
                    label="Password"
                    name="pass"
                    type='password'
                    margin={isSmallScreen ? 'dense' : 'normal'}
                    size={isSmallScreen ? 'small' : 'medium'}
                    value={formData.password}
                    onChange={handlers.pass}
                    error={formError.pass !== ""}
                    helperText={formError.pass}
                />
            </Tooltip>
            <Box
                sx={{
                    width: { xs: '100%', sm: 'min-content' },
                    position: 'relative'
                }}>    
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ mt: 2, px: 5 }}
                    fullWidth
                    disabled={isRequestInFlight ||
                    Object.values(formError).reduce((doesAnErrorExist, errMsg) => {
                        if (errMsg !== "") {
                            return true;
                        }
                        return doesAnErrorExist;
                    }, false)}
                >
                    Submit
                </Button>
                {loading &&
                    <CircularProgress sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px'
                    }} />
                }
            </Box>
            
            <AltLoginButtons />
        </Paper>
    );
}