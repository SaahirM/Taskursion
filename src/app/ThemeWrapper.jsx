'use client';

import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { IBM_Plex_Sans, Open_Sans } from 'next/font/google';

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
});
const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap'
});

// This theme was created using https://zenoo.github.io/mui-theme-creator/
const unresponsiveTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#7200ff',
        },
        secondary: {
            main: '#e694ff',
        },
        background: {
            default: '#14002f',
            paper: '#130027',
        },
        error: {
            main: '#fb2c1e',
        },
        warning: {
            main: '#ffa300',
        },
        info: {
            main: '#0085f1',
        },
        success: {
            main: '#00d00f',
        },
    },
    typography: {
        h1: {
            fontFamily: ibmPlexSans.style.fontFamily,
        },
        h2: {
            fontFamily: ibmPlexSans.style.fontFamily,
        },
        button: {
            fontFamily: openSans.style.fontFamily,
            fontSize: '1.1rem',
            lineHeight: 2,
            letterSpacing: '0.05em',
            fontWeight: 700,
        },
        h3: {
            fontFamily: ibmPlexSans.style.fontFamily,
        },
    },
    shape: {
        borderRadius: 5,
    }
});

const theme = responsiveFontSizes(unresponsiveTheme);

export default function ThemeWrapper({ children }) {
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
}