import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import { Switch, ToggleButton, ToggleButtonGroup, Typography, useColorScheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";

export default function ThemeControls() {
    const [mounted, setMounted] = useState(false);
    const { mode, setMode } = useColorScheme();
    const isSystemDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
    const theme = mode !== 'system' ? mode : (isSystemDarkTheme ? 'dark' : 'light');

    // only render client-side (mode is undefined on the server)
    useEffect(() => { setMounted(true) }, []);
    if (!mounted) return null;
    
    return (<Grid container>
        <Grid xs='auto'>
            <Switch
                aria-labelledby='system-switch-label'
                edge='start'
                size='medium'
                checked={mode === 'system'}
                onChange={e => setMode(
                    e.target.checked
                    ? 'system'
                    : isSystemDarkTheme ? 'dark' : 'light'
                )}
            />
        </Grid>
        <Grid xs display='flex' alignItems='center'>        
            <Typography id='system-switch-label'>Sync with system</Typography>
        </Grid>
        <Grid xs={12} display='flex' justifyContent='center'>        
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
    </Grid>);
}