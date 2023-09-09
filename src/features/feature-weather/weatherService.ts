import axios from 'axios';
import qs from 'qs';
import { IWeatherService, WeatherAPIResponse } from './types';

export const weatherServiceFactory = (): IWeatherService => {
  return {
    fetchWeather: async () => {
      const response = await axios.get('https://weatherapi-com.p.rapidapi.com/foreca22738st.json',
        {
          params: {
            q: 'Tel Aviv',
            days: '3'
          },
          paramsSerializer: {
            serialize: (params) => qs.stringify(params, { encode: false }),
          },
          headers: {
            'X-RapidAPI-Key': '0dc6bbd1f8msh3868012b61f3923p11097ejsn749766b5828e',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          }
        }
      )
      //   .catch((e: any) => ({
      //   status: e.status || 400,
      //   data: {},
      // }));

      return response as { status: number;  data: WeatherAPIResponse};
    },
  };
};
