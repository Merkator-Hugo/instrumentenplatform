import { TemperatureWeatherData } from './temperature-weather-data';

export class WeatherData {
    temperature: TemperatureWeatherData;
    constructor(temperature: TemperatureWeatherData){
        this.temperature = temperature;
    }
}