import { Box, useTheme } from "@mui/material";

export default function PlainBorderHeader({ children }) {
    const theme = useTheme()

    return <Box sx={{
        height: '100vh',
        backgroundColor: theme.palette.secondary.main,
        p: 1
    }}>
        <Box sx={{
            height: '100%',
            backgroundColor: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            p: 1,
            boxShadow: '4px 4px 10px black inset'
        }}>
            {children}
        </Box>
    </Box>
}