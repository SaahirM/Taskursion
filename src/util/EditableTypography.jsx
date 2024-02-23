import { InputBase, Typography, darken, lighten, useTheme } from "@mui/material";
import { createRef, useEffect, useState } from "react";

// inspired by https://stackoverflow.com/a/76965111
export default function EditableTypography({ variant, value, multiline=false }) {
    const TypographyRef = createRef();
    const inputRef = createRef();

    // const [internalValue, setInternalValue] = useState(value);

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const dummyTypography = <Typography variant={variant} ref={TypographyRef} display='none'/>

    useEffect(() => {
        if (TypographyRef.current && inputRef.current) {
            const input = inputRef.current.children[0];

            if (!multiline) {
                input.className = "";
            }
            TypographyRef.current.classList.forEach(className => {
                input.classList.add(className);
            })

            input.style.display = 'unset';
            input.style.border = 0;
            input.style.backgroundColor = theme.palette.background.default;
            input.style.color = theme.palette.getContrastText(theme.palette.background.default);
            input.style.padding = theme.spacing(1);
            input.style.borderRadius = theme.shape.borderRadius + "px";

            if (multiline) {
                input.style.width = "100%";
            }

            const tint = isDarkMode ? lighten : darken;

            const onInputHover = e => {
                if (!e.target.matches(":focus")) {
                    input.style.backgroundColor = tint(theme.palette.background.default, 0.1);
                }
            }
            const onInputHoverOut = e => {
                if (!e.target.matches(":focus")) {
                    input.style.backgroundColor = theme.palette.background.default;
                }
            }
            const onInputFocus = e => {
                input.style.backgroundColor = tint(theme.palette.background.default, 0.05);
            }
            const onInputBlur = e => {
                if (e.target.matches(":hover")) {
                    input.style.backgroundColor = tint(theme.palette.background.default, 0.1);
                } else {    
                    input.style.backgroundColor = theme.palette.background.default;
                }
            }
            
            input.addEventListener('mouseover', onInputHover);
            input.addEventListener('mouseout', onInputHoverOut);
            input.addEventListener('focus', onInputFocus);
            input.addEventListener('blur', onInputBlur);

            return () => {
                input.removeEventListener('mouseover', onInputHover);
                input.removeEventListener('mouseout', onInputHoverOut);
                input.removeEventListener('focus', onInputFocus);
                input.removeEventListener('blur', onInputBlur);
            }
        }
    }, [theme]);

    return (<>
        {dummyTypography}
        <InputBase
            value={value}
            ref={inputRef}
            multiline={multiline}
        />
    </>);
}