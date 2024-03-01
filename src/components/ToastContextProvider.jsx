"use client";

import { Alert, Snackbar } from "@mui/material";
import { createContext, useEffect, useState } from "react";

export const ToastContext = createContext((
    (message, ignoreClickaway = true, snackbarProps = {}, alertProps = {}) => {}
));

export default function ToastContextProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [sbProps, setSbProps] = useState({});
    const [aProps, setAProps] = useState({});

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => { setMsg(""); }, 500);
    }

    const handleCloseIgnoreClickaway = (_, reason) => {
        if (reason === 'clickaway') return;
        handleClose();
    }

    const [closeHandler, setCloseHandler] = useState(() => handleClose);

    const [queue, setQueue] = useState([]);

    const toast = (
        message,
        ignoreClickaway = true,
        snackbarProps = {},
        alertProps = {}
    ) => {
        setQueue([...queue, {
            message: message,
            closeHandler: ignoreClickaway ? handleCloseIgnoreClickaway : handleClose,
            sbProps: snackbarProps,
            aProps: alertProps
        }]);
    }

    useEffect(() => {
        if ((!msg) && (queue.length > 0)) {
            const newToast = queue[0];
            const {message, closeHandler, sbProps, aProps} = newToast;
            setQueue(queue.splice(1));
            
            setMsg(message);
            setCloseHandler(() => closeHandler);
            setSbProps(sbProps);
            setAProps(aProps);
            setOpen(true);
        }
    }, [queue, msg]);

    return (<ToastContext.Provider value={toast}>
        {children}
        <Snackbar
            open={open}
            autoHideDuration={9000}
            onClose={closeHandler}
            {...sbProps}
        >
            <Alert onClose={handleClose} severity='error' variant='filled' {...aProps}>
                {msg}
            </Alert>
        </Snackbar>
    </ToastContext.Provider>);
}