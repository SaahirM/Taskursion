import { Box, InputBase, Typography, darken, lighten, useTheme } from "@mui/material";
import { createRef, useEffect, useState } from "react";

// inspired by https://stackoverflow.com/a/76965111
export default function EditableTypography({
    variant, value, setValue, multiline=false, styles={}, hoverStyles={}, focusStyles={},
    ...props
}) {
    const TypographyRef = createRef();
    const inputContainerRef = createRef();

    const [internalValue, setInternalValue] = useState(value);

    const dummyTypography = <Typography variant={variant} ref={TypographyRef} display='none'/>

    useEffect(() => {
        if (TypographyRef.current && inputContainerRef.current) {
            const input = inputContainerRef.current.children[0];

            if (!multiline) {
                input.className = "";
            }
            TypographyRef.current.classList.forEach(className => {
                input.classList.add(className);
            })
        }
    });

    return (<>
        {dummyTypography}
        <Box sx={theme => {
            const isDarkMode = theme.palette.mode === 'dark';
            const tint = isDarkMode ? lighten : darken;

            return {
                [(multiline ? "& textarea" : "& input")]: {
                    display: 'unset',
                    backgroundColor: 'background.default',
                    color: theme.palette.getContrastText(theme.palette.background.default),
                    padding: 1,
                    border: 0,
                    borderRadius: 1,
                    ...styles
                },
                [(multiline ? "& textarea:hover" : "& input:hover")]: {
                    backgroundColor: tint(theme.palette.background.default, 0.1),
                    ...hoverStyles
                },
                [(multiline ? "& textarea:focus" : "& input:focus")]: {
                    backgroundColor: tint(theme.palette.background.default, 0.05),
                    ...focusStyles
                },
                "& div": multiline ? {} : {
                    width: "100%"
                }
            }
        }}>    
            <InputBase
                value={internalValue}
                onChange={e => setInternalValue(e.target.value)}
                onBlur={() => setValue(internalValue)}
                ref={inputContainerRef}
                multiline={multiline}
                {...props}
            />
        </Box>
    </>);
}