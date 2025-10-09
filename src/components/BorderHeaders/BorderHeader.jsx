import { Box } from "@mui/material";
import BorderHeaderHeader from "./BorderHeaderHeader";
import ScrollableBox from "./ScrollableBox";

export default function BorderHeader({
    primaryHeaderComponent, secondaryHeaderComponent, disableTopShadow = false, children
}) {
    const borderHoverStyles = theme => ({
        ':hover:not(:has(.not-outer-box:hover))': { backgroundColor: theme.vars.palette.secondary.light },
        ':active:not(:has(.not-outer-box:active))': { backgroundColor: theme.vars.palette.secondary.dark }
    });

    return (
        <Box
            // the "outer box" that represents the border
            sx={[{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                bgcolor: theme => theme.vars.palette.secondary.main,
                color: theme => theme.vars.palette.secondary.contrastText,
                px: 1,
                pb: 1,
                pt: primaryHeaderComponent ? 0 : 1
            }, primaryHeaderComponent ? borderHoverStyles : {}]}>
            <BorderHeaderHeader
                primaryHeaderComponent={primaryHeaderComponent}
                secondaryHeaderComponent={secondaryHeaderComponent}
            />
            <Box
                // the "inner box" within the border that contains the content

                // This class exists to be used by borderHoverStyles, so the border correctly glows only
                // when it is hovered over
                className="not-outer-box"

                sx={{
                    height: '100%',
                    overflow: 'hidden',
                    bgcolor: theme => theme.vars.palette.background.default,
                    color: theme => theme.vars.palette.text.primary,
                    borderRadius: 3,
                    boxShadow: '4px 1px 5px black inset',
                    zIndex: 2
                }}>
                <ScrollableBox
                    /*
                    an "inner inner box" with a scrollbar. This needs to be its own box, and cannot
                    be combined with "inner box" above so content inside here can be scrolled but
                    the scrollbar will not be on top of the rounded corners. See 
                    https://stackoverflow.com/questions/16676166/apply-border-radius-to-scrollbars-with-css
                    for more context
                    */
                >
                    {disableTopShadow || <Box
                        /*
                        sticky shadow at the top of the content area at a higher z-index. Page content 
                        being scrolled through will appear underneath this shadow. Without this box, 
                        content on the page appears above the shadow created by the borderHeader, 
                        despite it being under the borderHeader, which made it look unnatural. This 
                        problem still exists for shadows created by the borderHeader along the bottom
                        of the page content area.
                        */
                        sx={theme => ({
                            height: 10,
                            width: "100%",
                            position: 'sticky',
                            top: 0,
                            zIndex: 3,

                            background: "linear-gradient(0deg, transparent, #2e2e2e)",
                            [theme.getColorSchemeSelector('dark')]: {
                                background: "linear-gradient(0deg, transparent, black)"
                            }
                        })} />}
                    <Box
                        /* An "inner innner inner box" to pad the page content */
                        sx={{
                            px: 2,
                            pb: 2
                        }}>
                        {children}
                    </Box>
                </ScrollableBox>
            </Box>
        </Box>
    );
}
