import { Button, Paper, TextField, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function SignupForm({ formData, formError, handlers }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (<Paper sx={{ p: [2, 3], mt: [1, 2], border: 2, borderRadius: theme.shape.borderRadius }}>
        <Typography variant="h2" textAlign='center' mb={[1, 2]}>Create an account</Typography>
        <Typography variant='body2' mb={[2, 1]}>
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
        <Button
            type='submit'
            variant='contained'
            sx={{ mt: 2, px: 5 }}
            fullWidth={isSmallScreen ? true : false}
            disabled={Object.values(formError).reduce((doesAnErrorExist, errMsg) => {
                if (errMsg !== "") {
                    return true;
                }
                return doesAnErrorExist
            }, false)}
        >
            Submit
        </Button>
    </Paper>);
}