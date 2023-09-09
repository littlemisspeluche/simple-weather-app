import { DateTime } from 'luxon';

export const timeNow: DateTime = DateTime.now();
export const currentDate: DateTime = DateTime.local();
export const currentTime: string = timeNow.toFormat('HH:mm a');
export const todayName: string = currentDate.toLocaleString({ weekday: 'short' });

export const time24Hour = (time12Hour?: string): string => time12Hour ? DateTime.fromFormat(time12Hour, "hh:mm a").toFormat("HH:mm a") : '';

export const isDaytime = (sunrise: string, sunset: string, now: string) => {
    const sunriseTime = DateTime.fromFormat(sunrise, 'hh:mm a');
    const sunsetTime = DateTime.fromFormat(sunset, 'hh:mm a');

    // const newYorkTimeNow = DateTime.now().setZone('Asia/Tel_Aviv');
    // const newYorkCurrentTime = newYorkTimeNow.toFormat('HH:mm a');
    // console.log("newYorkCurrentTime:", newYorkCurrentTime)

    const timeNow = DateTime.fromFormat(now, 'hh:mm a');

    return timeNow >= sunriseTime && timeNow <= sunsetTime;
};