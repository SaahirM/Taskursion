import { DarkModeRounded, LightModeRounded, SettingsBrightnessRounded } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, Switch, ToggleButton, ToggleButtonGroup, Typography, useColorScheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

export default function ThemeChangeBtn() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { mode, setMode } = useColorScheme();

    return <>
        <Button
            variant='outlined'
            size='small'
            sx={{ position: 'absolute', top: 16, right: 16, fontSize: { xs: '0.8rem', sm: '1rem' }, fontWeight: 600 }}
            startIcon={<SettingsBrightnessRounded />}
            onClick={() => { setDialogOpen(true); }}
        >
            Theme
        </Button>
        <Dialog
            open={dialogOpen}
            onClose={() => { setDialogOpen(false); }}
            aria-labelledby='theme-dialog-title'
        >
            <DialogTitle id='theme-dialog-title' variant='h2'>Change Theme</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid xs='auto'>
                        <Switch
                            aria-labelledby='system-switch-label'
                            edge='start'
                            size='medium'
                        />
                    </Grid>
                    <Grid xs display='flex' alignItems='center'>        
                        <Typography id='system-switch-label'>Sync with system</Typography>
                    </Grid>
                    <Grid xs={12} display='flex' justifyContent='center'>        
                        <ToggleButtonGroup
                            exclusive
                            sx={{ '& > .MuiToggleButton-root': {
                                fontSize: { xs: '0.8rem', sm: '1rem' },
                                lineHeight: 1.5
                            }}}
                        >
                            <ToggleButton value='light'><LightModeRounded /> Light Mode</ToggleButton>
                            <ToggleButton value='dark'><DarkModeRounded /> Dark Mode</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    </>;
}