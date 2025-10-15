import { AutoAwesomeRounded } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function SummarizeButton({ onClick, disabled }) {
    return (
        <Button
            startIcon={<AutoAwesomeRounded />}
            variant="contained"
            size="small"
            onClick={onClick}
            disabled={disabled}

            sx={theme => ({
                background: 'linear-gradient(90deg, #8f00ff, #f800ee, #ff5c00)',
                backgroundSize: '200% 100%',
                backgroundPositionX: '100%',

                '&:hover': {
                    backgroundPositionX: '0%',
                    animation: 'color-shift 400ms 1',
                    '@keyframes color-shift': {
                        '0%': { backgroundPositionX: '100%' },
                        '100%': { backgroundPositionX: '0%' },
                    },
                },

                animation: 'color-shift-back 1s 1',
                '@keyframes color-shift-back': {
                    '0%': { backgroundPositionX: '0%' },
                    '100%': { backgroundPositionX: '100%' },
                },

                [theme.getColorSchemeSelector('dark')]: {
                    backgroundImage: 'linear-gradient(90deg, #36f59c, #36def5, #ff0097)',
                    backgroundSize: '200% 100%',
                    backgroundPositionX: '100%',

                    '&:hover': {
                        backgroundPositionX: '0%',
                        animation: 'color-shift 400ms 1',
                        '@keyframes color-shift': {
                            '0%': { backgroundPositionX: '100%' },
                            '100%': { backgroundPositionX: '0%' },
                        },
                    },

                    animation: 'color-shift-back 1s 1',
                    '@keyframes color-shift-back': {
                        '0%': { backgroundPositionX: '0%' },
                        '100%': { backgroundPositionX: '100%' },
                    },
                }
            })}
        >
            Summarize with AI
        </Button>
    );
}
