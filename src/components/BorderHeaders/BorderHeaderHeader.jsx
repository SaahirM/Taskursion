import { ButtonBase, Link } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import NextLink from "next/link";

export default function BorderHeaderHeader({ primaryHeaderComponent, secondaryHeaderComponent }) {
    if (!primaryHeaderComponent) return <></>;

    return (<>
        <header>
            <Grid container alignItems='center' py={1}>
                <Grid xs={secondaryHeaderComponent ? 6 : 12}>    
                    <ButtonBase
                        sx={{ p: 1, zIndex: 2, ':focus': { outline: 'solid' } }}
                        href={primaryHeaderComponent.linkTarget}
                    >
                        {primaryHeaderComponent.component}
                    </ButtonBase>
                </Grid>
                <Grid xs={secondaryHeaderComponent ? 6 : 12} sx={{
                    position: 'relative', display: 'flex', justifyContent: 'end'
                }}>
                    {secondaryHeaderComponent ? secondaryHeaderComponent : <></>}
                </Grid>
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