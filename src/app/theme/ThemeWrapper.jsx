'use client';

import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { createContext, useState } from "react";
import themeBuilder from "./ThemeBuilder";

export const ColourSchemeContext = createContext();

export default function ThemeWrapper({ children }) {
    const [colourScheme, setColourScheme] = useState('system');
    const isDarkModePreferred = useMediaQuery(
        "(prefers-color-scheme: dark)", { defaultMatches: false }
    );

    let mode = 'dark';
    if (colourScheme === 'system') {
        mode = isDarkModePreferred ? 'dark' : 'light';
    } else if (colourScheme === 'light') {
        mode = 'light';
    }

    const theme = themeBuilder(mode);

    return (<ColourSchemeContext.Provider value={{ colourScheme, setColourScheme }}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </ColourSchemeContext.Provider>);
}