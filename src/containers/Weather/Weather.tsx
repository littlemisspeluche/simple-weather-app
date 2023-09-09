import { useContext, useEffect, useState } from 'react';
import { WiHumidity, WiThermometer } from 'react-icons/wi';
import { FiWind } from 'react-icons/fi';
import { MdSunny } from 'react-icons/md';

import { ForecastDay, IWeatherService, WeatherServiceSymbol } from 'features/feature-weather/types';
import { time24Hour, currentTime, isDaytime } from 'utils/dateTimeHelpers';
import Box from 'components/Box/Box';
import { nightWeatherColors, dayWeatherColors } from './weatherColors';
import SunriseToSunSet from './components/SunriseToSunSet/SunriseToSunSet';
import Forecast from './components/Forecast/Forecast';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import Header from './components/Header/Header';
import { AppContext, TAppContext } from 'context/context';
import { Snackbar } from 'components/Snackbar/Snackbar';
import { useDependency } from 'features/feature-ioc/hooks';
import { useQuery } from '@tanstack/react-query';
import { telAvivNewWeather } from './dummyData';

const Weather = () => {
    const {
        // data,
        setIsToastOpen, isToastOpen, toastMessageText, setToastMessageType, setToastMessageText } = useContext(AppContext) as TAppContext;

    const findClosestTimestamp = (timestamp?: number, forecastDay?: ForecastDay) => {
        let closestTimestamp = forecastDay?.hour[0].time_epoch;

        if (closestTimestamp && timestamp) {
            let timeDifference = Math.abs(timestamp - closestTimestamp);
    
            forecastDay?.hour.forEach((timestampItem) => {
                const currentDifference = Math.abs(timestamp - timestampItem.time_epoch);
    
                if (currentDifference < timeDifference) {
                    closestTimestamp = timestampItem.time_epoch;
                    timeDifference = currentDifference;
                }
            });
    
            return closestTimestamp;
        }
    };


    const [backgroundColor, setBackgroundColor] = useState<string>('')
    const [secondaryBackgroundColor, setSecondaryBackgroundColor] = useState<string>('')

        const weatherService = useDependency<IWeatherService>(WeatherServiceSymbol);

    const { data } = useQuery(['https://weatherapi-com.p.rapidapi.com/forecast.json'],
        async () => {
            const response = await weatherService.fetchWeather();

            if (response.status === 200) {
                setToastMessageType('success');
                setToastMessageText('Forecast fetched successfuly');
                setIsToastOpen(true);
            } else {
                setToastMessageText('Opps, we encountered an unexpected error');
                setToastMessageType('error');
                setIsToastOpen(true);
            };

            return response.data;
        },
        {
            suspense: false,
            // // refetchOnWindowFocus: true,
            // staleTime: 30 * 1000,
            // refetchInterval: 30 * 1000,
            // refetchOnMount: true,
            // retry: 1,
            useErrorBoundary: true,
            onError(err) {
                console.log("foo-error")
                new Error("foo-error")
            },
        }
    );

      const onCloseSnackbar = () => {
    setIsToastOpen(!isToastOpen);
  };

        // const data = telAvivNewWeather
    const currentDay = data?.forecast?.forecastday?.[0];
    const sunrise: string = time24Hour(currentDay?.astro.sunrise);
    const sunset: string = time24Hour(currentDay?.astro.sunset);
    const closestTimestamp = findClosestTimestamp(data?.current?.last_updated_epoch, data?.forecast?.forecastday?.[0]);
    const closestTimestampItem = data?.forecast?.forecastday?.[0].hour.find((hourItem) => hourItem.time_epoch === closestTimestamp);


    useEffect(() => {
        if (data) {
          setBackgroundColor(isDaytime(sunrise, sunset, currentTime) ? `${dayWeatherColors[data?.current.condition.text]?.background}` : `${nightWeatherColors[data.current.condition.text]?.background}`)
          setSecondaryBackgroundColor(isDaytime(sunrise, sunset, currentTime) ? `${dayWeatherColors[data?.current.condition.text]?.secondaryBackground}` : `${nightWeatherColors[data.current.condition.text]?.secondaryBackground}`)
      }
    
    }, [data, sunrise, sunset]);
    
    const uvIndexMap = (uvIndex) => {
        switch (uvIndex) {
            case 0:
            case 1:
            case 2:
                return 'Low'

            case 3:
            case 4:
            case 5:
                return 'Medium'

            case 6:
            case 7:
                return 'High'

            case 8:
            case 9:
            case 10:
                return 'Very High'

            case 11:
                return 'Extreme'

            default:
                return 'Low'
        };
    };


    return (
        <div className='flex flex-col items-center gap-4 py-6 px-3'
            style={{ backgroundColor: backgroundColor }}
        >
            <Header data={data} />
            <HourlyForecast data={data} backgroundColor={secondaryBackgroundColor} />
            <Forecast data={data} backgroundColor={secondaryBackgroundColor} secondaryBackgroundColor={backgroundColor} />
            <div className='w-[100%] grid gap-y-2 gap-x-2 grid-cols-1 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3'>
                {closestTimestampItem?.uv && (
                    <Box
                        backgroundColor={secondaryBackgroundColor}
                        content={{ main: closestTimestampItem.uv.toString(), note: uvIndexMap(closestTimestampItem.uv) }}
                        title='UV INDEX'
                        icon={MdSunny}
                    />
                )}
                <Box
                    backgroundColor={secondaryBackgroundColor}
                    content={{ main: `${closestTimestampItem?.humidity}%`, note: `The dew point is: ${closestTimestampItem?.dewpoint_c}° right now` }}
                    title='HUMIDITY'
                    icon={WiHumidity}
                />
                {closestTimestampItem?.feelslike_c && data?.current?.temp_c &&
                    <Box
                        backgroundColor={secondaryBackgroundColor}
                        content={{ main: `${closestTimestampItem.feelslike_c}`, note: `humidity is making it feels ${closestTimestampItem.feelslike_c > data.current?.temp_c ? 'warmer' : 'colder'}` }}
                        title='FEELS LIKE'
                        icon={WiThermometer}
                    />
                }
                {closestTimestampItem?.wind_kph && (
                    <Box
                        backgroundColor={secondaryBackgroundColor}
                        content={{
                            children: (
                                <div>
                                    <p className='text-[1.75rem]'>{closestTimestampItem.wind_kph.toString()}</p>
                                    <p>km/h</p>
                                </div>
                            )
                        }}
                        title='WIND'
                        icon={FiWind}
                    />
                )}
                {closestTimestampItem?.pressure_mb && (
                    <div className='lg:row-span-2'>
                        <Box
                            backgroundColor={secondaryBackgroundColor}
                            content={{ main: closestTimestampItem.pressure_mb.toLocaleString(), note: 'hPa' }}
                            title='PRESSURE'
                            icon={FiWind}
                        />
                    </div>
                )}
                <div className='col-end-2 md:col-end-3 lg:row-span-3 lg:col-end-4'>
                    <SunriseToSunSet data={data} backgroundColor={secondaryBackgroundColor} />
                </div>
            </div>
            <div className="snackbar-container">
            <Snackbar
              autoHideDuration={3000}
              open={isToastOpen}
              onClose={onCloseSnackbar}
              message={toastMessageText}
            />
          </div>
        </div>
    )
};

export default Weather;
