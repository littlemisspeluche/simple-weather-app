import { FC } from "react";

import { WeatherAPIResponse } from "features/feature-weather/types";

const Header: FC<{ data?: WeatherAPIResponse; }> = ({ data }) => {
    return (
        <div className='text-center mb-[4rem]'>
            <p className='text-[2rem]'>{data?.location?.name}</p>
            <p className='text-[4rem]'>{data?.current?.temp_c}°</p>
            <p className='text-[1.5rem]'>{data?.current?.condition?.text}</p>
        </div>
    );
};

export default Header;