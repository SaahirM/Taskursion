import { extendTheme, responsiveFontSizes } from '@mui/material';
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
    weight: ['600', '800']
});

const darkModePalette = {
    background: { default: '#14002F', paper: '#130027' },
    primary: { main: '#E694FF' },
    secondary: { main: '#7200FF' },
    error: { main: '#FB2C1E' },
    warning: { main: '#FFA300' },
    info: { main: '#0085F1' },
    success: { main: '#00D00F' }
};

const lightModePalette = {
    background: { default: '#FCF4FF' },
    primary: { main: '#AA03FF' },
    secondary: { main: '#DCC2FF' },
    error: { main: '#FB2C1E' },
    warning: { main: '#FFA300' },
    info: { main: '#0085F1' },
    success: { main: '#00D00F' }
};

export default function themeBuilder() {
    const unresponsiveTheme = extendTheme({
        colorSchemes: {
            light: { palette: lightModePalette },
            dark: { palette: darkModePalette }
        },
        typography: {
            h1: { fontFamily: ibmPlexSansBold.style.fontFamily },
            h2: { fontFamily: ibmPlexSans.style.fontFamily },
            h3: { fontFamily: ibmPlexSans.style.fontFamily },
            button: {
                fontFamily: openSans.style.fontFamily,
                fontSize: '1.1rem',
                fontWeight: '800',
                lineHeight: 2,
                letterSpacing: '0.05em'
            }
        },
        shape: { borderRadius: 5 },
        cssVarPrefix: 'taskursion',
        colorSchemeSelector: '[data-taskursion-theme-%s]',
    });

    const theme = responsiveFontSizes(unresponsiveTheme);
    return theme;
}

export const themeLocalStorageKey = 'user-preferred-theme';