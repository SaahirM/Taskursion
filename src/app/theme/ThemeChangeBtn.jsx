import { SettingsBrightnessRounded } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function ThemeChangeBtn() {
    return <Button
        variant='outlined'
        size='small'
        sx={{ position: 'absolute', top: 16, right: 16, fontSize: { xs: '0.8rem', sm: '1rem' }, fontWeight: 600 }}
        startIcon={<SettingsBrightnessRounded />}
    >
        Theme
    </Button>;
}