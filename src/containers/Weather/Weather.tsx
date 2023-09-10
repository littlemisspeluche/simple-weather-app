import { useCallback, useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { time24Hour, isDaytime } from 'utils/dateTimeHelpers';
import { nightWeatherColors, dayWeatherColors } from './constants/weatherColors';
import Forecast from './components/Forecast/Forecast';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import Header from './components/Header/Header';
import { AppContext, TAppContext } from 'context/context';
import { Snackbar } from 'components/Snackbar/Snackbar';
import { ErrorBoundary } from 'react-error-boundary';
import MainErrorBoundary from 'components/ErrorBoundary/MainErrorBoundary';
import { useFetchForecast } from './hooks/useFetchForecast';
import HourlyData from './components/HourlyData/HourlyData';

const Weather = () => {
    const [backgroundColor, setBackgroundColor] = useState<string>('')
    const [secondaryBackgroundColor, setSecondaryBackgroundColor] = useState<string>('')

    const { setIsToastOpen, isToastOpen, toastMessageText } = useContext(AppContext) as TAppContext;
    const { data, isFetching } = useFetchForecast();

    const originalDateTime = data?.location?.localtime_epoch;
    const dateTime = originalDateTime && DateTime.fromSeconds(originalDateTime);

    const formattedTime = dateTime ? (dateTime).toFormat("HH:mm a") : '';
    const currentDay = data?.forecast?.forecastday?.[0];
    const sunrise: string = time24Hour(currentDay?.astro.sunrise);
    const sunset: string = time24Hour(currentDay?.astro.sunset);

    const onCloseSnackbar = useCallback(() => setIsToastOpen(!isToastOpen), [isToastOpen, setIsToastOpen]);

    useEffect(() => {
        if (data && formattedTime) {
            const dayWeatherText = dayWeatherColors[data?.current.condition.text];
            const nightWeatherText = nightWeatherColors[data?.current.condition.text];

            const dayWeatherBg = dayWeatherText?.background;
            const dayWeatherSBg = dayWeatherText?.secondaryBackground;
            const nightWeatherBg = nightWeatherText?.background;
            const nightWeathersBg = nightWeatherText?.secondaryBackground;

            if ((dayWeatherBg && dayWeatherSBg) || (nightWeatherBg && nightWeathersBg)) {
                setBackgroundColor(isDaytime(sunrise, sunset, formattedTime) ? dayWeatherBg : nightWeatherBg)
                setSecondaryBackgroundColor(isDaytime(sunrise, sunset, formattedTime) ? dayWeatherSBg : nightWeathersBg)
            }
        }
    }, [data, sunrise, sunset, formattedTime]);

    if (isFetching) {
        return <>Loading...</>
    }

    return (
        <>
            <div className='h-[100%] flex flex-col items-center gap-4 py-6 px-3' style={{ backgroundColor: backgroundColor }}>
                <ErrorBoundary FallbackComponent={MainErrorBoundary}>
                    <Header locationName={data?.location?.name} temp={data?.current?.temp_c} weatherCondition={data?.current?.condition?.text} />
                    <HourlyForecast current={data?.current} forecast={data?.forecast} backgroundColor={secondaryBackgroundColor} currentTime={formattedTime} />
                    <Forecast forecast={data?.forecast} backgroundColor={secondaryBackgroundColor} />
                    <HourlyData current={data?.current} forecast={data?.forecast} backgroundColor={secondaryBackgroundColor} currentTime={formattedTime} />
                </ErrorBoundary>
            </div>
            <Snackbar
                autoHideDuration={3000}
                open={isToastOpen}
                onClose={onCloseSnackbar}
                message={toastMessageText}
            />
        </>
    );
};

export default Weather;
