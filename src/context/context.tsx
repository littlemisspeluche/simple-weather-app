import React, { FC, useState, ReactNode, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useDependency } from 'features/feature-ioc/hooks';
import { IWeatherService, WeatherAPIResponse, WeatherServiceSymbol } from 'features/feature-weather/types';
import { telAvivNewWeather } from 'containers/Weather/dummyData';

export type snackbarModes = 'success' | 'error';

export type TAppContext = {
    toastMessageType: snackbarModes;
    toastMessageText: string;
    isToastOpen: boolean;
    setIsToastOpen: (toastStatus: boolean) => void;
    setToastMessageText: (toastStatus: string) => void;
    setToastMessageType: (toastStatus: snackbarModes) => void;
    data?: WeatherAPIResponse | undefined;
}

export const AppContext = createContext<TAppContext | undefined>(
    undefined
);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [toastMessageType, setToastMessageType] =
        useState<snackbarModes>('success');
    const [toastMessageText, setToastMessageText] = useState<string>('');
    const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

    // const weatherService = useDependency<IWeatherService>(WeatherServiceSymbol);

    // const { data } = useQuery(['https://weatherapi-com.p.rapidapi.com/forecast.json'],
    //     async () => {
    //         const response = await weatherService.fetchWeather();

    //         if (response.status === 200) {
    //             setToastMessageType('success');
    //             setToastMessageText('Forecast fetched successfuly');
    //             setIsToastOpen(true);
    //         } else {
    //             setToastMessageText('Opps, we encountered an unexpected error');
    //             setToastMessageType('error');
    //             setIsToastOpen(true);
    //         };

    //         return response.data;
    //     },
    //     {
    //         // suspense: false,
    //         // // refetchOnWindowFocus: true,
    //         // staleTime: 30 * 1000,
    //         // refetchInterval: 30 * 1000,
    //         // refetchOnMount: true,
    //         // retry: 1,
    //         useErrorBoundary: true,
    //         // onError(err) {
    //         //     new Error("foo-error")
    //         // },
    //     }
    // );

    return (
        <AppContext.Provider
            value={{
                toastMessageType,
                toastMessageText,
                isToastOpen,
                setIsToastOpen,
                setToastMessageText,
                setToastMessageType,
                // data
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
