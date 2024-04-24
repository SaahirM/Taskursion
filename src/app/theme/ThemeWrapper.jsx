'use client';

import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript, useColorScheme, useMediaQuery } from "@mui/material";
import themeBuilder from "./ThemeBuilder";
import { useEffect } from "react";

export default function ThemeWrapper({ children }) {
    const theme = themeBuilder();

    return (<CssVarsProvider theme={theme}>
        {getInitColorSchemeScript()}
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