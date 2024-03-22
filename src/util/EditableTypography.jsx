import { Box, InputBase, lighten, darken } from "@mui/material";

export default function EditableTypography({
    text: {
        variant, component, maxRows = null
    },
    ...props
}) {
    return (<Box sx={theme => {
        const isDarkMode = theme.palette.mode === 'dark';
        const tint = isDarkMode ? lighten : darken;

        return {    
            [`& > ${component}`]: {
                p: 1,
                borderRadius: 1,
                cursor: 'text',
                marginBlock: 'unset',
                ...theme.typography[variant]
            },
            [`& > ${component}:hover`]: {
                bgcolor: tint(theme.palette.background.default, 0.1)
            },
            [`& > ${component}:focus-within`]: {
                bgcolor: tint(theme.palette.background.default, 0.05)
            }
        }
    }}>
        <InputBase multiline maxRows={maxRows} slots={{ root: component }} {...props} />
    </Box>);
}