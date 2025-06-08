import { Box } from "@mui/material";

export default function ScrollableBox({ children }) {
    return (
        <Box
            sx={theme => ({
                height: '100%',
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
            })}>
            {children}
        </Box>
    );
}