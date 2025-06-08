'use client';

import { CssBaseline, InitColorSchemeScript, ThemeProvider } from "@mui/material";
import themeBuilder from "./ThemeBuilder";

const THEME_CONFIG = {
    defaultMode: 'system',
    modeStorageKey: 'user-preferred-theme',
    colorSchemeStorageKey: 'colour-scheme',
    attribute: 'data-taskursion-theme'
};

export const htmlThemeProps = { [THEME_CONFIG.attribute]: THEME_CONFIG.defaultMode };

export default function ThemeWrapper({ children }) {
    const theme = themeBuilder();

    return (<ThemeProvider theme={theme}>
        <InitColorSchemeScript />
        <CssBaseline />
        {children}
    </ThemeProvider>);
}