"use client";

import { Alert, Snackbar } from "@mui/material";
import { createContext, useEffect, useState } from "react";

export const ToastContext = createContext((
    (message, snackbarProps = {}, alertProps = {}) => {}
));

export default function ToastContextProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [sbProps, setSbProps] = useState({});
    const [aProps, setAProps] = useState({});

    const [queue, setQueue] = useState([]);

    const toast = (message, snackbarProps = {}, alertProps = {}) => {
        setQueue([...queue, {
            message: message,
            sbProps: snackbarProps,
            aProps: alertProps
        }]);
    }

    useEffect(() => {
        if ((!msg) && (queue.length > 0)) {
            const newToast = queue[0];
            const {message, sbProps, aProps} = newToast;
            setQueue(queue.splice(1));
            
            setMsg(message);
            setSbProps(sbProps);
            setAProps(aProps);
            setOpen(true);
        }
    }, [queue, msg]);

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') return;
        
        setOpen(false);
        setTimeout(() => { setMsg(""); }, 500);
    }

    return (<ToastContext.Provider value={toast}>
        {children}
        <Snackbar
            open={open}
            autoHideDuration={9000}
            onClose={handleClose}
            {...sbProps}
        >
            <Alert onClose={handleClose} severity='error' variant='filled' {...aProps}>
                {msg}
            </Alert>
        </Snackbar>
    </ToastContext.Provider>);
}