import { FC } from "react";
import { DateTime } from 'luxon';
import { PiSunHorizonBold } from 'react-icons/pi';
import { MdOutlineWbSunny } from 'react-icons/md';

import { WeatherAPIResponse } from "features/feature-weather/types";
import { time24Hour, currentTime } from 'utils/dateTimeHelpers';
import { SunriseToSunSetScaleWrapper } from "./styles";

const SunriseToSunSet: FC<{ data?: WeatherAPIResponse; backgroundColor: string; }> = ({ data, backgroundColor }) => {
    const currentDay = data?.forecast.forecastday[0];
    const tomorrow = data?.forecast.forecastday[1];

    const sunrise = time24Hour(currentDay?.astro.sunrise);
    const sunset = time24Hour(currentDay?.astro.sunset);

    const stringToDateTime = (timeString: string) => DateTime.fromFormat(timeString, 'hh:mm a');

    const findClosestTime = (currentTime: string, sunrise: string, sunset: string) => {
        const currentTimeDT = stringToDateTime(currentTime);
        const sunriseDT = stringToDateTime(sunrise);
        const sunsetDT = stringToDateTime(sunset);

        const timeToSunrise = Math.abs(currentTimeDT.diff(sunriseDT, 'minutes').minutes);
        const timeToSunset = Math.abs(currentTimeDT.diff(sunsetDT, 'minutes').minutes);

        if (timeToSunrise < timeToSunset) {
            return 0;
        } else {
            return 1;
        }
    };

    const closestTime = findClosestTime(currentTime, sunrise, sunset);

    const calculateTimeDifference = (startTime: string, endTime: string) => {
        // Parse the time strings into Luxon DateTime objects
        const startDateTime = DateTime.fromFormat(startTime, "hh:mm a");
        const endDateTime = DateTime.fromFormat(endTime, "hh:mm a");

        // Calculate the duration between the two times
        const duration = endDateTime.diff(startDateTime);

        // Convert the duration to a human-readable format
        const formattedDuration = duration.toFormat("hh.mm");

        return formattedDuration;
    };

    const timeUntilNow = calculateTimeDifference(sunrise, currentTime);
    const timeFromSunriseToSunset = calculateTimeDifference(sunrise, sunset);
    const timeDifference: number = (parseFloat(timeUntilNow) / parseFloat(timeFromSunriseToSunset));

    return (
        <SunriseToSunSetScaleWrapper
            point={(timeDifference <= 1 && timeDifference >= 0) ? timeDifference : closestTime}
            style={{ background: backgroundColor }}
            className='p-3 rounded-lg'
        >
            <div>
                <div className='w-[100%] flex flex-col items-center justify-between m-[0 auto]'>
                    <div className="arc">
                        <div className='flex items-center justify-center'>
                            {timeDifference >= 1 ?
                                <PiSunHorizonBold size="15px" />
                                :
                                <MdOutlineWbSunny size="15px" />
                            }
                        </div>
                    </div>
                    <div className='flex gap-[10rem] my-4 text-center'>
                        <div>
                            <p>Sunrise</p>
                            <p className='font-bold'>{time24Hour(currentDay?.astro.sunrise)}</p>
                        </div>
                        <div>
                            <p>Sunset</p>
                            <p className='font-bold'>{time24Hour(currentDay?.astro.sunset)}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center gap-4 bg-[white] rounded-lg p-3'>
                    <div className="flex flex-col items-center">
                        <p className='!text-[#6B6C72]'>Sunrise</p>
                        <p className="text-dark">{tomorrow?.astro.sunrise}</p>
                    </div>
                    <div>
                        <p className="text-dark">Tomorrow</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className='!text-[#6B6C72]'>Sunset</p>
                        <p className="text-dark">{time24Hour(tomorrow?.astro.sunset)}</p>
                    </div>
                </div>
            </div>
        </SunriseToSunSetScaleWrapper>

    )
};

export default SunriseToSunSet;