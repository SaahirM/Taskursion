import { darken, experimental_extendTheme as extendTheme, lighten, responsiveFontSizes } from '@mui/material';
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

const darkBg = '#14002F';
const darkModePalette = {
    background: {
        default: darkBg,
        hover: lighten(darkBg, 0.05),
        focus: lighten(darkBg, 0.1),
        paper: '#130027'
    },
    primary: { main: '#E694FF' },
    secondary: { main: '#7200FF' },
    error: { main: '#FB2C1E' },
    warning: { main: '#FFA300' },
    info: { main: '#0085F1' },
    success: { main: '#00D00F' }
};

const lightBg = '#FCF4FF';
const lightModePalette = {
    background: {
        default: lightBg,
        hover: darken(lightBg, 0.05),
        focus: darken(lightBg, 0.1)
    },
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
        shape: { borderRadius: 5 }
    });

    const theme = responsiveFontSizes(unresponsiveTheme);
    return theme;
}