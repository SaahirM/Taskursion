import { Alert, Box, InputBase, Tooltip } from "@mui/material";

export default function EditableTypography({
    text: {
        variant, component, maxRows = null
    },
    error = false, helperText,
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
            bgcolor: theme.vars.palette.action.hover,
        },
        [`& > ${component}:focus-within`]: {
            bgcolor: theme.vars.palette.action.focus,
        }
    })}>
        <Tooltip
            title={<Alert severity="error">{helperText}</Alert>}
            open={error}
            arrow
            placement="top-start"
            slotProps={{
                tooltip: {
                    sx: theme => ({
                        backgroundColor: theme.vars.palette.Alert.errorStandardBg,
                        border: 1,
                        borderColor: theme.vars.palette.text.primary,
                    }),
                },
                arrow: {
                    sx: theme => ({
                        '::before': {
                            backgroundColor: theme.vars.palette.Alert.errorStandardBg,
                            border: 1,
                            borderColor: theme.vars.palette.text.primary,
                        },
                    }),
                }
            }}
        >
            <InputBase multiline maxRows={maxRows} slots={{ root: component }} {...props} />
        </Tooltip>
    </Box>);
}