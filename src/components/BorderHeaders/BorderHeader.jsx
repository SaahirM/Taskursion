"use client";

import { Box, ButtonBase, Link, useTheme } from "@mui/material";
import NextLink from "next/link";

export default function BorderHeader({ primaryHeaderComponent, children }) {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    let [headerComponent, headerLink, borderStyleOverrides] = [<></>, <></>, {}];
    if (primaryHeaderComponent) {
        headerComponent = <ButtonBase
            sx={{ p: 1, zIndex: 2, ':focus': { outline: 'solid' } }}
            href={primaryHeaderComponent.linkTarget}
        >
            {primaryHeaderComponent.component}
        </ButtonBase>;
        headerLink = <Link
            component={NextLink}
            href={primaryHeaderComponent.linkTarget}
            height='100%'
            position='absolute'
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={1}
            tabIndex={-1}
        />;
        borderStyleOverrides = {
            ':hover:not(:has(.inner-box:hover))': { backgroundColor: theme.palette.secondary.light },
            ':active:not(:has(.inner-box:active))': { backgroundColor: theme.palette.secondary.dark }
        };
    }

    return (<Box
        // the "outer box" that represents the border
        display='flex'
        flexDirection='column'
        height='100vh'
        bgcolor={theme.palette.secondary.main}
        color={theme.palette.secondary.contrastText}
        p={1}
        sx={borderStyleOverrides}
    >
        <header>
            {headerComponent}
        </header>
        {headerLink}

        <Box
            // the "inner box" within the border that contains the content
            height={'100%'}
            overflow={'hidden'}
            bgcolor={theme.palette.background.default}
            color={theme.palette.getContrastText(theme.palette.background.default)}
            borderRadius={theme.shape.borderRadius}
            boxShadow={'4px 4px 10px black inset'}
            zIndex={2}
        >
            <div className="inner-box" style={{ height: '100%' }}
            /*
            I cannot give "inner box" a className, so I'm wrapping its children in div.inner-box.
            This class exists to be used by borderStyleOverrides, so the border correctly glows only
            when it is hovered over
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
                    p={1}
                    sx={{
                        overflowY: 'auto',
                        scrollbarColor: `${theme.palette.primary.dark} ${isDarkMode ? 'black' : 'white'}`,
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

            </div>
        </Box>

    </Box>);
}