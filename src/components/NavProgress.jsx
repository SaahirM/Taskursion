'use client';

import { useTheme } from "@mui/material";
import HolyLoader from "holy-loader";

export default function NavProgress() {
    const theme = useTheme();

    return (<HolyLoader
        color='var(--taskursion-palette-primary-main)'
        height={theme.spacing(1)}
    />);
}