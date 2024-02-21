import { ButtonBase, Link, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import NextLink from "next/link";

export default function BorderHeaderHeader({ primaryHeaderComponent, secondaryHeaderComponent }) {
    if (!primaryHeaderComponent) return <></>;

    const theme = useTheme();

    return (<>
        <header>
            <Grid container alignItems='center' py={1}>
                <Grid 
                    xs={secondaryHeaderComponent ? 10 : 12}
                    sm={secondaryHeaderComponent ? 7 : 12}
                    md={secondaryHeaderComponent ? 9 : 12}
                >    
                    <ButtonBase
                        sx={{
                            width: '100%',
                            p: 1,
                            zIndex: 2,
                            ':focus': { outline: 'solid' },
                            justifyContent: 'start'
                        }}
                        href={primaryHeaderComponent.linkTarget}
                        LinkComponent={NextLink}
                    >
                        {primaryHeaderComponent.component}
                    </ButtonBase>
                </Grid>
                {secondaryHeaderComponent &&
                    <Grid xs={2} sm={5} md={3} sx={{
                        position: 'relative', display: 'flex', justifyContent: 'end'
                    }}>
                        <ButtonBase
                            sx={{
                                zIndex: 2,
                                borderRadius: 1,
                                backgroundColor: theme.palette.secondary.main,
                                ':hover': { backgroundColor: theme.palette.secondary.light },
                                ':active': { backgroundColor: theme.palette.secondary.dark }
                            }}
                            href={secondaryHeaderComponent.linkTarget}
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
            height='100%'
            position='absolute'
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={1}
            tabIndex={-1}
        />
    </>);
}