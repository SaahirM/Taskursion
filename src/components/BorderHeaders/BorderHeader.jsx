"use client";

import { Box, useTheme } from "@mui/material";

export default function BorderHeader({ headerComponent, children }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (<Box    // the "outer box" that represents the border
        display={'flex'}
        flexDirection={'column'}
        height={'100vh'}
        bgcolor={theme.palette.secondary.main}
        color={theme.palette.secondary.contrastText}
        p={1}
    >
        <Box p={1}>    
            {headerComponent}
        </Box>

        <Box        // the "inner box" within the border that contains the content
            height={'100%'}
            overflow={'hidden'}
            bgcolor={theme.palette.background.default}
            color={theme.palette.getContrastText(theme.palette.background.default)}
            borderRadius={theme.shape.borderRadius}
            boxShadow={'4px 4px 10px black inset'}
        >
            <Box    /*
                    an "inner inner box" with a scrollbar. This needs to be its own, inner div
                    so the scrollbar is not on top of the rounded corners
                    */
                height={'100%'}
                p={1}
                sx={{
                    overflowY: 'auto',
                    scrollbarWidth: 2,
                    scrollbarColor: `${isDarkMode ? 'black' : 'white'} ${theme.palette.primary.dark}`,
                    '&::-webkit-scrollbar': {
                        backgroundColor: isDarkMode ? 'black' : 'white',
                        width: 10,
                        borderRadius: theme.shape.borderRadius
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: theme.shape.borderRadius
                    },
                    '&::-webkit-scrollbar-button': {
                        backgroundColor: theme.palette.primary.dark
                    }
                }}
            >
                {children}
            </Box>
        </Box>
    </Box>);
}