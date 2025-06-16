'use client';

import { CssBaseline, InitColorSchemeScript, ThemeProvider } from "@mui/material";
import themeBuilder, { themeLocalStorageKey } from "./ThemeBuilder";

export default function ThemeWrapper({ children }) {
    const theme = themeBuilder();

    return (<ThemeProvider theme={theme} modeStorageKey={themeLocalStorageKey}>
        <InitColorSchemeScript attribute={theme.colorSchemeSelector} modeStorageKey={themeLocalStorageKey} />
        <CssBaseline />
        {children}
    </ThemeProvider>);
}