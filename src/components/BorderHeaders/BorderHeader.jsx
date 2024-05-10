"use client";

import { Box, useTheme } from "@mui/material";
import BorderHeaderHeader from "./BorderHeaderHeader";

export default function BorderHeader({
    primaryHeaderComponent, secondaryHeaderComponent, children
}) {
    const theme = useTheme();
    const borderHoverStyles = primaryHeaderComponent ? {
        ':hover:not(:has(.not-outer-box:hover))': { backgroundColor: theme.vars.palette.secondary.light },
        ':active:not(:has(.not-outer-box:active))': { backgroundColor: theme.vars.palette.secondary.dark }
    } : {};

    return (<Box
        // the "outer box" that represents the border
        display='flex'
        flexDirection='column'
        height='100vh'
        bgcolor={theme.vars.palette.secondary.main}
        color={theme.vars.palette.secondary.contrastText}
        px={1} pb={1} pt={primaryHeaderComponent ? 0 : 1}
        sx={borderHoverStyles}
    >
        <BorderHeaderHeader
            primaryHeaderComponent={primaryHeaderComponent}
            secondaryHeaderComponent={secondaryHeaderComponent}
        />

        <Box
            // the "inner box" within the border that contains the content
            height={'100%'}
            overflow={'hidden'}
            bgcolor={theme.vars.palette.background.default}
            color={theme.vars.palette.text.primary}
            borderRadius={3}
            boxShadow={'4px 1px 5px black inset'}
            zIndex={2}

            className="not-outer-box"
            // This class exists to be used by borderHoverStyles, so the border correctly glows only
            // when it is hovered over
        >
            <Box
                /*
                an "inner inner box" with a scrollbar. This needs to be its own box, and cannot
                be combined with "inner box" above so content inside here can be scrolled but
                the scrollbar will not be on top of the rounded corners. See 
                https://stackoverflow.com/questions/16676166/apply-border-radius-to-scrollbars-with-css
                for more context
                */
                height={'100%'}
                sx={{
                    position: 'relative',
                    overflowY: 'auto',

                    // firefox
                    '@supports not selector(::-webkit-scrollbar)': {
                        scrollbarColor: theme.vars.palette.primary.light + " white",
                        [theme.getColorSchemeSelector('dark')]: {
                            scrollbarColor: theme.vars.palette.primary.dark + " black"
                        },
                    },

                    // chrome, safari, etc
                    '@supports selector(::-webkit-scrollbar)': {
                        '&::-webkit-scrollbar': {
                            width: 10,
                            borderRadius: 5,

                            backgroundColor: 'white',
                            [theme.getColorSchemeSelector('dark')]: {
                                backgroundColor: 'black'
                            }
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: theme.vars.palette.primary.main,
                            borderRadius: 5
                        },
                        '&::-webkit-scrollbar-button': {
                            backgroundColor: theme.vars.palette.primary.light,
                            [theme.getColorSchemeSelector('dark')]: {
                                backgroundColor: theme.vars.palette.primary.dark
                            }
                        }
                    }
                }}
            >
                <Box
                    height={10}
                    width="100%"
                    position='sticky'
                    top={0}
                    zIndex={3}
                    sx={theme => ({
                        background: "linear-gradient(0deg, transparent, #2e2e2e)",
                        [theme.getColorSchemeSelector('dark')]: {
                            background: "linear-gradient(0deg, transparent, black)"
                        }
                    })}
                />
                <Box px={2} pb={2}
                /* An "inner innner inner box" to pad the content */
                >
                    {children}
                </Box>
            </Box>
        </Box>

    </Box>);
}