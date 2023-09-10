import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useDependency } from 'features/feature-ioc/hooks';
import { IWeatherService, WeatherAPIResponse, WeatherServiceSymbol } from 'features/feature-weather/types';
import { AppContext, TAppContext } from 'context/context';

export const useFetchForecast = () => {
    const weatherService = useDependency<IWeatherService>(WeatherServiceSymbol);
    const { setIsToastOpen, setToastMessageText } = useContext(AppContext) as TAppContext;

    const { data: weather, isFetching } = useQuery(['/forecast.json'],
        async () => {
            const response = await weatherService.fetchWeather();

            if (response.status === 200) {
                setToastMessageText('Forecast fetched successfuly');
                setIsToastOpen(true);
            } else {
                setToastMessageText('Opps, we encountered an unexpected error');
                setIsToastOpen(true);
            };

            return response.data;
        },
        {
            suspense: false,
            // staleTime: 30 * 1000,
            // refetchInterval: 30 * 1000,
            // refetchOnMount: true,
            // retry: 1,
            useErrorBoundary: true,
        }
    );


    return { data: weather ?? {} as WeatherAPIResponse, isFetching };
};
