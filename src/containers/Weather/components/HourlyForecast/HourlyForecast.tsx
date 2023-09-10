import { FC } from 'react';
import { DateTime } from 'luxon';
import { LuClock9 } from 'react-icons/lu';

import { Forecast, Current } from 'features/feature-weather/types';
import { time24Hour } from 'utils/dateTimeHelpers';
import Box from 'components/Box/Box';
import { removeFutureHours, removePrevHours } from 'containers/Weather/utils/hourlyForecastHelpers';

const HourlyForecast: FC<{ forecast: Forecast; current: Current; backgroundColor: string; currentTime: string }> = ({ forecast, backgroundColor, currentTime, current }) => {
    const currentDay = forecast.forecastday[0];
    const tomorrow = forecast.forecastday[1];
    const tomorrowSunset = time24Hour(tomorrow?.astro.sunset);
    const tomorrowSunsetToDateTime = DateTime.fromFormat(tomorrowSunset, "hh:mm a");
    const tomorrowSubsetTimestamp: string = tomorrowSunsetToDateTime.toFormat('HH.mm');
    const todayHours = removePrevHours(currentDay?.hour, parseFloat(currentTime));
    const tomorrowHours = removeFutureHours(tomorrow?.hour, parseFloat(tomorrowSubsetTimestamp));
    const hours = todayHours ? todayHours.concat(tomorrowHours) : [];

    return (
        <Box
            backgroundColor={backgroundColor}
            content={{
                children: (
                    <div className='flex overflow-auto'>
                        {hours.map((hourItem, index) => {
                            return (
                                <div
                                    key={hourItem.time}
                                    className={`flex flex-col items-center justify-center gap-3 ${index === 0 ? 'my-[0.975rem] mr-[0.975rem] ml-[0.5rem] md:my-[1.5rem] md:mr-[1.5rem]' : 'm-[0.975rem] md:m-[1.5rem] md:p-2'}`}
                                >
                                    {index === 0 ?
                                        (<p className='h-[2rem] md:text-[1.2rem]'>Now</p>)
                                        :
                                        (<p className='h-[2rem] md:text-[1.2rem]'>{DateTime.fromSeconds(hourItem.time_epoch).toFormat('HH')}</p>)
                                    }
                                    <div className='w-[1.5rem] h-[1.5rem] flex items-center justify-center'>
                                        <img src={current.condition.icon} alt={current.condition.text} className='w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]' />
                                    </div>
                                    <p className='md:text-[1.2rem]'>{Math.round(hourItem.temp_c)}°</p>
                                </div>
                            );
                        })}
                    </div>
                )
            }}
            title='HOURLY FORECAST'
            icon={LuClock9}
        />
    );
};

export default HourlyForecast;