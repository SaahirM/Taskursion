import { SettingsBrightnessRounded } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import ThemeControls from "./ThemeControls";

export default function ThemeChangeBtn() {
    const [dialogOpen, setDialogOpen] = useState(false);

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
                <ThemeControls />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setDialogOpen(false); }}>Close</Button>
            </DialogActions>
        </Dialog>
    </>;
}