import axios from 'axios';
import qs from 'qs';
import { IWeatherService, WeatherAPIResponse } from './types';

export const weatherServiceFactory = (): IWeatherService => {
  return {
    fetchWeather: async () => {
      const response = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json',
        {
          params: {
            q: 'Tel Aviv',
            days: '3'
          },
          paramsSerializer: {
            serialize: (params) => qs.stringify(params, { encode: false }),
          },
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
          }
        }
      ).catch((e: any) => ({
        status: e.status || 400,
        data: {},
      }));

      return response as { status: number;  data: WeatherAPIResponse};
    },
  };
};
