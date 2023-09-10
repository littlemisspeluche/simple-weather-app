import { FC } from "react";
import { WiHumidity, WiThermometer } from 'react-icons/wi';
import { FiWind } from 'react-icons/fi';
import { MdSunny } from 'react-icons/md';

import Box from 'components/Box/Box';
import { Forecast, Current, ForecastDay } from "features/feature-weather/types";
import SunriseToSunSet from "../SunriseToSunSet/SunriseToSunSet";
import { uvIndexMap } from "containers/Weather/utils/hourlyDataHelpers";

const HourlyData: FC<{ forecast: Forecast; current: Current; backgroundColor: string; currentTime: string; }> = ({ forecast, current, backgroundColor, currentTime }) => {
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

    const closestTimestamp = findClosestTimestamp(current.last_updated_epoch, forecast.forecastday[0]);
    const closestTimestampItem = forecast?.forecastday[0].hour.find((hourItem) => hourItem.time_epoch === closestTimestamp);

    return (
        <div className='w-[100%] grid gap-y-2 gap-x-2 grid-cols-1 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3'>
                <Box
                    backgroundColor={backgroundColor}
                    content={{ main: closestTimestampItem?.uv.toString(), note: uvIndexMap(closestTimestampItem?.uv) }}
                    title='UV INDEX'
                    icon={MdSunny}
                />
            <Box
                backgroundColor={backgroundColor}
                content={{ main: `${closestTimestampItem?.humidity}%`, note: `The dew point is: ${closestTimestampItem?.dewpoint_c}° right now` }}
                title='HUMIDITY'
                icon={WiHumidity}
            />
                <Box
                    backgroundColor={backgroundColor}
                    content={{ main: `${closestTimestampItem?.feelslike_c}`, note: closestTimestampItem ? `humidity is making it feels ${closestTimestampItem?.feelslike_c > current.temp_c ? 'warmer' : 'colder'}` : '' }}
                    title='FEELS LIKE'
                    icon={WiThermometer}
                />
                <Box
                    backgroundColor={backgroundColor}
                    content={{
                        children: (
                            <div>
                                <p className='text-[1.75rem]'>{closestTimestampItem?.wind_kph.toString()}</p>
                                <p>km/h</p>
                            </div>
                        )
                    }}
                    title='WIND'
                    icon={FiWind}
                />
            {closestTimestampItem?.pressure_mb && (
                <div className='lg:row-span-2'>
                    <Box
                        backgroundColor={backgroundColor}
                        content={{ main: closestTimestampItem.pressure_mb.toLocaleString(), note: 'hPa' }}
                        title='PRESSURE'
                        icon={FiWind}
                    />
                </div>
            )}
            {currentTime && (
                <div className='col-end-2 md:col-end-3 lg:row-span-3 lg:col-end-4'>
                    <SunriseToSunSet forecast={forecast} backgroundColor={backgroundColor} currentTime={currentTime} />
                </div>
            )}
        </div>
    )
};

export default HourlyData;