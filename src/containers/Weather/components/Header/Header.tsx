import { FC } from "react";

const Header: FC<{ locationName: string, temp: number, weatherCondition: string }> = ({ locationName, temp, weatherCondition }) => {
    return (
        <div className='text-center mb-[4rem]'>
            <p className='text-[2rem]'>{locationName}</p>
            <p className='text-[4rem]'>{temp}°</p>
            <p className='text-[1.5rem]'>{weatherCondition}</p>
        </div>
    );
};

export default Header;