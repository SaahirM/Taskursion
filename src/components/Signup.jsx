"use client";

import { useTheme } from "@emotion/react";
import { Button, Container, Paper, TextField, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";

const PASS_REGEX = /(?=.*[^A-Za-z0-9_ \t\r\n\v\f])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/;

export default function Signup() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const [formData, setFormData] = useState({ name: "", email: "", pass: "" });
    const [formError, setFormError] = useState({ name: "", email: "", pass: "" });

    const handleNameChange = e => {
        setFormData({ ...formData, name: e.target.value });
        const name = e.target.value;

        if (name.length > 255) {
            setFormError({
                ...formError,
                name: "This name is too long! Please use at most 255 characters."
            });
        } else {
            setFormError({
                ...formError,
                name: ""
            });
        }
    }

    const handleEmailChange = e => {
        setFormData({ ...formData, email: e.target.value });
        const email = e.target.value;

        if (email.length > 254) {
            setFormError({
                ...formError,
                email: "This email is too long! Email addresses must not exceed 254 characters."
            });
        } else {
            setFormError({
                ...formError,
                email: ""
            });
        }
    }

    const handlePassChange = e => {
        setFormData({ ...formData, pass: e.target.value });
        const pass = e.target.value;

        if (pass === "") {
            setFormError({
                ...formError,
                pass: ""
            });
        } else if (pass.length < 8) {
            setFormError({
                ...formError,
                pass: "This password is too short! It needs to have at least 8 characters."
            });
        } else if (!PASS_REGEX.test(pass)) {
            setFormError({
                ...formError,
                pass: "This password doesn't meet the requirements."
            });
        } else {
            setFormError({
                ...formError,
                pass: ""
            });
        }
    }

    return (<Container
        maxWidth='sm'
        component='form'
    >
        <Paper sx={{ p: 3, mt: [1, 3], border: 2, borderRadius: theme.shape.borderRadius }}>
            <Typography variant="h2" textAlign='center' mb={[1, 4]}>Create an account</Typography>
            <TextField
                fullWidth
                required
                variant='filled'
                label="Name"
                name="name"
                margin={isSmallScreen ? 'dense' : 'normal'}
                size={isSmallScreen ? 'small' : 'medium'}
                value={formData.name}
                onChange={handleNameChange}
                error={formError.name !== ""}
                helperText={formError.name}
            />
            <TextField
                fullWidth
                required
                variant='filled'
                label="Email"
                name="email"
                type='email'
                margin={isSmallScreen ? 'dense' : 'normal'}
                size={isSmallScreen ? 'small' : 'medium'}
                value={formData.email}
                onChange={handleEmailChange}
                error={formError.email !== ""}
                helperText={formError.email}
            />
            <Tooltip
                title="Must have at least 8 characters, a symbol, a number, an uppercase character,
                and a lowercase character"
                disableHoverListener
                placement='top-start'
            >
                <TextField
                    fullWidth
                    required
                    variant='filled'
                    label="Password"
                    name="pass"
                    type='password'
                    margin={isSmallScreen ? 'dense' : 'normal'}
                    size={isSmallScreen ? 'small' : 'medium'}
                    value={formData.password}
                    onChange={handlePassChange}
                    error={formError.pass !== ""}
                    helperText={formError.pass}
                />
            </Tooltip>
            <Button
                type='submit'
                variant='contained'
                sx={{ mt: 2, px: 5 }}
                fullWidth={isSmallScreen ? true : false}
                disabled={Object.values(formError).reduce((doesAnErrorExist, errMsg) => {
                    if (errMsg !== "") {
                        return true;
                    }
                    return doesAnErrorExist
                }, false)}
            >
                Submit
            </Button>
        </Paper>
    </Container>);
}