'use client';

import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript } from "@mui/material";
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

    return (<CssVarsProvider theme={theme} {...THEME_CONFIG}>
        {getInitColorSchemeScript(THEME_CONFIG)}
        <CssBaseline />
        {children}
    </CssVarsProvider>);
}