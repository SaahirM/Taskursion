"use client";

import { Box, useTheme } from "@mui/material";
import BorderHeaderHeader from "./BorderHeaderHeader";

export default function BorderHeader({
    primaryHeaderComponent, secondaryHeaderComponent, children
}) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const borderHoverStyles = primaryHeaderComponent ? {
        ':hover:not(:has(.not-outer-box:hover))': { backgroundColor: theme.palette.secondary.light },
        ':active:not(:has(.not-outer-box:active))': { backgroundColor: theme.palette.secondary.dark }
    } : {};

    return (<Box
        // the "outer box" that represents the border
        display='flex'
        flexDirection='column'
        height='100vh'
        bgcolor={theme.palette.secondary.main}
        color={theme.palette.secondary.contrastText}
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
            bgcolor={theme.palette.background.default}
            color={theme.palette.getContrastText(theme.palette.background.default)}
            borderRadius={theme.shape.borderRadius}
            boxShadow={'4px 1px 5px black inset'}
            zIndex={2}
        >
            <div className="not-outer-box" style={{ height: '100%' }}
            /*
            I cannot give "inner box" a className, so I'm wrapping its children in div.not-outer-box.
            This class exists to be used by borderStyleOverrides, so the border correctly glows only
            when it is hovered over

            In the future, consider using a React.ref for "inner box" to achieve this.
            See https://mui.com/material-ui/getting-started/faq/#how-can-i-access-the-dom-element
            */
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
                        scrollbarColor: (
                            isDarkMode
                                ? theme.palette.primary.dark + " black"
                                : theme.palette.primary.light + " white"
                        ),
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
                            backgroundColor: isDarkMode
                                ? theme.palette.primary.dark
                                : theme.palette.primary.light
                        }
                    }}
                >
                    <Box
                        height={10}
                        width="100%"
                        position='sticky'
                        top={0}
                        zIndex={3}
                        sx={{ background: "linear-gradient(0deg, transparent, #2e2e2e)" }}
                    />
                    <Box px={2} pb={2}
                    /* An "inner innner inner box" to pad the content */
                    >

                        {children}
                    </Box>
                </Box>

            </div>
        </Box>

    </Box>);
}