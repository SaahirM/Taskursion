"use client";

import { createContext, useContext, useState } from "react";

export const NetworkReqInFlightContext = createContext({
    isRequestInFlight: false,
    setRequestInFlight: () => {}
});

export default function NetworkReqInFlightContextProvider({ children }) {
    const [isRequestInFlight, setIsRequestInFlight] = useState(false);

    const setRequestInFlight = (inFlight) => {
        setIsRequestInFlight(inFlight);
    };

    return (
        <NetworkReqInFlightContext.Provider value={{ isRequestInFlight, setRequestInFlight }}>
            {children}
        </NetworkReqInFlightContext.Provider>
    );
}

export const useNetworkRequest = () => {
    const context = useContext(NetworkReqInFlightContext);
    if (!context) {
        throw new Error('useNetworkRequest must be used within a NetworkReqInFlightContextProvider');
    }
    return context;
};
