import React, { FC, useState, ReactNode, createContext } from 'react';

export type snackbarModes = 'success' | 'error';

export type TAppContext = {
    toastMessageText: string;
    isToastOpen: boolean;
    setIsToastOpen: (toastStatus: boolean) => void;
    setToastMessageText: (toastStatus: string) => void;
}

export const AppContext = createContext<TAppContext | undefined>(
    undefined
);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [toastMessageText, setToastMessageText] = useState<string>('');
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

    return (
        <AppContext.Provider
            value={{
                toastMessageText,
                isToastOpen,
                setIsToastOpen,
                setToastMessageText,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
