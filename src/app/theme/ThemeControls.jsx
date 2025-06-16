import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { Switch, ToggleButton, ToggleButtonGroup, Typography, useColorScheme, useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Grid';

export default function ThemeControls() {
    const { mode, setMode } = useColorScheme();
    // not using useColorScheme.systemMode because it's undefined when mode is not 'system'
    // but we need to know the system theme when the user switches out of system mode below
    const systemTheme = useMediaQuery("(prefers-color-scheme: dark)") ? 'dark' : 'light';
    const theme = mode !== 'system' ? mode : systemTheme;

    // only render client-side (mode is undefined on the server)
    if (!mode) return null;
    
    return (
        <Grid container>
            <Grid size='auto'>
                <Switch
                    aria-labelledby='system-switch-label'
                    edge='start'
                    size='medium'
                    checked={mode === 'system'}
                    onChange={e => setMode(e.target.checked ? 'system' : systemTheme)}
                />
            </Grid>
            <Grid
                size="grow"
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>        
                <Typography id='system-switch-label'>Sync with system</Typography>
            </Grid>
            <Grid
                size={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>        
                <ToggleButtonGroup
                    exclusive
                    sx={{ '& > .MuiToggleButton-root': {
                        fontSize: { xs: '0.7rem', sm: '1rem' },
                        lineHeight: 1.5,
                        p: 1
                    }}}
                    value={theme}
                    onChange={e => setMode(e.currentTarget.value)}
                    disabled={mode === 'system'}
                >
                    <ToggleButton value='light'><LightModeRounded />Light Mode</ToggleButton>
                    <ToggleButton value='dark'><DarkModeRounded />Dark Mode</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
        </Grid>
    );
}