import { DateTime } from 'luxon';
import { Hour } from 'features/feature-weather/types';

export const removePrevHours = (arr: Hour[], num: number) => arr?.filter((element) => parseFloat(DateTime.fromSeconds(element.time_epoch).toFormat('HH.mm')) >= num);

export const removeFutureHours = (arr: Hour[], num: number) => {
    const array: Hour[] = [];

    arr?.forEach((element) => {
        const dateTime = DateTime.fromFormat(element.time, "yyyy-MM-dd HH:mm");
        const formattedTime = dateTime.toFormat("HH.mm");

        if (num && parseFloat(formattedTime) <= num) {
            array.push(element);
        }
    });

    return array;
};
