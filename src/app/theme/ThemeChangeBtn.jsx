import { ComputerRounded, DarkModeRounded, LightModeRounded, SettingsBrightnessRounded } from "@mui/icons-material";
import { Button, ButtonGroup, Dialog, DialogContent, DialogTitle, useColorScheme } from "@mui/material";
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
        >
            <DialogTitle variant='h2'>Change Theme</DialogTitle>
            <DialogContent>
                <ButtonGroup
                    variant='contained'
                    sx={{ '& > .MuiButton-root': { fontSize: { xs: '0.8rem' } }}}
                >
                    <Button startIcon={<LightModeRounded />}>Light</Button>
                    <Button startIcon={<ComputerRounded />}>System</Button>
                    <Button startIcon={<DarkModeRounded />}>Dark</Button>
                </ButtonGroup>
            </DialogContent>
        </Dialog>
    </>;
}