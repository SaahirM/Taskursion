import { Box, InputBase } from "@mui/material";

export default function EditableTypography({
    text: {
        variant, component, maxRows = null
    },
    ...props
}) {
    return (<Box sx={theme => ({
        [`& > ${component}`]: {
            p: 1,
            borderRadius: 1,
            cursor: 'text',
            marginBlock: 'unset',
            ...theme.typography[variant]
        },
        [`& > ${component}:hover`]: {
            bgcolor: theme.vars.palette.background.hover,
        },
        [`& > ${component}:focus-within`]: {
            bgcolor: theme.vars.palette.background.focus,
        }
    })}>
        <InputBase multiline maxRows={maxRows} slots={{ root: component }} {...props} />
    </Box>);
}