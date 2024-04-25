'use client';

import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript, useColorScheme, useMediaQuery } from "@mui/material";
import themeBuilder from "./ThemeBuilder";
import { useEffect } from "react";

const THEME_CONFIG = {
    defaultMode: 'dark',
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
        <SetSystemTheme />
        {children}
    </CssVarsProvider>);
}

function SetSystemTheme() {
    const isDarkModePreferred = useMediaQuery("(prefers-color-scheme: dark)");
    const { setColorScheme } = useColorScheme();

    useEffect(() => {
        if (isDarkModePreferred) {
            setColorScheme('dark');
        } else {
            setColorScheme('light');
        }
    }, [isDarkModePreferred]);
}