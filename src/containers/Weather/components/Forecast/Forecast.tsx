import { FC, useState } from "react";
import { DateTime } from 'luxon';
import { BsCalendar3 } from 'react-icons/bs';

import { ForecastDay, Forecast as ForecastType } from "features/feature-weather/types";
import { todayName } from "utils/dateTimeHelpers";
import Box from "components/Box/Box";
import { ForecastTempsScaleWrapper } from "./styles";
import { useWindowWidth } from "hooks/useWindowWidth";

const Forecast: FC<{ forecast: ForecastType; backgroundColor: string; }> = ({ forecast, backgroundColor }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useWindowWidth((width) => {
        setWindowWidth(width);
    });

    const ForecastTempsScale: FC<{ item: ForecastDay }> = ({ item }) => {
        return (
            <div className='flex items-center justify-between w-[60%] md:w-[100%]'>
                <p className="md:text-[1.2rem]">{Math.round(item.day.mintemp_c)}°</p>
                <ForecastTempsScaleWrapper
                    max={item.day.maxtemp_c}
                    min={item.day.mintemp_c}
                    average={item.day.avgtemp_c}
                    backgroundColor={backgroundColor}
                >
                    <div className="arc">
                        <div className="pointer"></div>
                    </div>
                </ForecastTempsScaleWrapper>
                <p className="md:text-[1.2rem]">{Math.round(item.day.maxtemp_c)}°</p>
            </div>

        );
    };

    const Day: FC<{ item: ForecastDay }> = ({ item }) => {
        // Get the day name
        const parsedDate = DateTime.fromISO(item.date);
        // 'ccc' gives the day name
        const dayName = parsedDate.toFormat('ccc');
        return (
            <div className="flex items-center justify-between gap-4 w-[30%] md:w-[100%]">
                <p className="md:text-[1.2rem]">{todayName === dayName ? 'Today' : dayName}</p>
                <img src={item.day.condition.icon} alt={item.day.condition.text} className='w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]' />
            </div>
        );
    }

    return (
        <>
            {windowWidth < 640 ? (
                <Box
                    backgroundColor={backgroundColor}
                    content={{
                        children: (
                            <>
                                {forecast.forecastday.map((dayItem) => {
                                    return (
                                        <div className='flex items-center justify-between w-[100%]'>
                                            <Day item={dayItem} />
                                            <ForecastTempsScale item={dayItem} />
                                        </div>
                                    );
                                })}
                            </>
                        )
                    }}
                    title='3-DAY FORECAST'
                    icon={BsCalendar3}
                />
            ) : (
                <Box
                    backgroundColor={'transparent'}
                    content={{
                        children: (
                            <div className='w-[100%] grid gap-y-2 gap-x-2 grid-cols-2 lg:grid-cols-3'>
                                {forecast.forecastday.map((dayItem) => {
                                    return (
                                        <Box
                                            key={dayItem.date}
                                            backgroundColor={backgroundColor}
                                            content={{
                                                children: (
                                                    <>
                                                        <Day item={dayItem} />
                                                        <ForecastTempsScale item={dayItem} />
                                                    </>
                                                )
                                            }} />
                                    );
                                })}
                            </div>
                        )
                    }}
                    title='3-DAY FORECAST'
                    icon={BsCalendar3}
                />
            )
            }
        </>
    );
};

export default Forecast;