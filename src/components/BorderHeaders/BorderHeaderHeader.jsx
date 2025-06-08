import { ButtonBase, Link } from "@mui/material";
import Grid from '@mui/material/Grid';
import NextLink from "next/link";

export default function BorderHeaderHeader({ primaryHeaderComponent, secondaryHeaderComponent }) {
    if (!primaryHeaderComponent) return <></>;

    return (
        <>
            <header>
                <Grid
                    container
                    sx={{
                        alignItems: 'center',
                        py: 1
                    }}>
                    <Grid
                        size={{
                            xs: secondaryHeaderComponent ? 10 : 12,
                            sm: secondaryHeaderComponent ? 7 : 12,
                            md: secondaryHeaderComponent ? 9 : 12
                        }}
                    >
                        <ButtonBase
                            sx={{
                                width: '100%',
                                p: 1,
                                zIndex: 2,
                                ':focus': { outline: 'solid' },
                                justifyContent: 'start'
                            }}
                            href={primaryHeaderComponent.linkTarget || null}
                            LinkComponent={NextLink}
                        >
                            {primaryHeaderComponent.component}
                        </ButtonBase>
                    </Grid>
                    {secondaryHeaderComponent &&
                        <Grid
                            sx={{
                                position: 'relative', display: 'flex', justifyContent: 'end'
                            }}
                            size={{ xs: 2, sm: 5, md: 3 }}
                        >
                            <ButtonBase
                                sx={theme => ({
                                    zIndex: 2,
                                    borderRadius: 1,
                                    backgroundColor: theme.vars.palette.secondary.main,
                                    ':hover': { backgroundColor: theme.vars.palette.secondary.light },
                                    ':active': { backgroundColor: theme.vars.palette.secondary.dark }
                                })}
                                href={secondaryHeaderComponent.linkTarget || null}
                                LinkComponent={NextLink}
                                className="not-outer-box"
                            >
                                {secondaryHeaderComponent.component}
                            </ButtonBase>
                        </Grid>
                    }
                </Grid>
            </header>
            <Link
                component={NextLink}
                href={primaryHeaderComponent.linkTarget}
                tabIndex={-1}
                sx={{
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1
                }} />
        </>
    );
}