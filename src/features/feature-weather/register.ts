import iocContainer from '../feature-ioc/inversifyContainer';
import { weatherServiceFactory } from './weatherService';
import { WeatherServiceSymbol } from './types';

export const register = () => {
  iocContainer.register(WeatherServiceSymbol, weatherServiceFactory);
};
