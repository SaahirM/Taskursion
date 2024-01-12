"use client";

import { Box, useTheme } from "@mui/material";

export default function BorderHeader({ headerComponent, children }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (<Box sx={{  // the "outer box" that represents the border
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        p: 1
    }}>
        {headerComponent}
        
        <Box sx={{      // the "inner box" within the border that contains the content
            height: '100%',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.default,
            color: theme.palette.getContrastText(theme.palette.background.default),
            borderRadius: theme.shape.borderRadius,
            boxShadow: '4px 4px 10px black inset'
        }}>
            <Box sx={{  /*
                        an "inner inner box" with a scrollbar. This needs to be its own, inner div
                        so the scrollbar is not on top of the rounded corners
                        */ 
                       
                height: '100%',
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
                },
                p: 1
            }}>    
                {children}
            </Box>
        </Box>
    </Box>);
}