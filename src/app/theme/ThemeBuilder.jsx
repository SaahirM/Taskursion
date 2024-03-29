import { createTheme, responsiveFontSizes } from '@mui/material';
import { IBM_Plex_Sans, Open_Sans } from 'next/font/google';

// This theme was created using https://zenoo.github.io/mui-theme-creator/
const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    display: 'swap',
    weight: '500'
});
const ibmPlexSansBold = IBM_Plex_Sans({
    subsets: ['latin'],
    display: 'swap',
    weight: '600'
});
const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
    weight: '800'
});

const darkModePalette = {
    mode: 'dark',
    primary: { main: '#e694ff' },
    secondary: { main: '#7200ff' },
    background: { default: '#14002f', paper: '#130027' },
    error: { main: '#fb2c1e' },
    warning: { main: '#ffa300' },
    info: { main: '#0085f1' },
    success: { main: '#00d00f' }
};

const lightModePalette = {
    mode: 'light',
    primary: { main: '#AA03FF' },
    secondary: { main: '#DCC2FF' },
    background: { default: '#fcf4ff' },
    error: { main: '#fb2c1e' },
    warning: { main: '#ffa300' },
    info: { main: '#0085f1' },
    success: { main: '#00d00f' }
};

export default function themeBuilder(mode) {
    const unresponsiveTheme = createTheme({
        palette: mode === 'dark' ? darkModePalette : lightModePalette,
        typography: {
            h1: { fontFamily: ibmPlexSansBold.style.fontFamily },
            h2: { fontFamily: ibmPlexSans.style.fontFamily },
            h3: { fontFamily: ibmPlexSans.style.fontFamily },
            button: {
                fontFamily: openSans.style.fontFamily,
                fontSize: '1.1rem',
                lineHeight: 2,
                letterSpacing: '0.05em'
            }
        },
        shape: { borderRadius: 5 }
    });

    const theme = responsiveFontSizes(unresponsiveTheme);
    return theme;
}