import { TemperatureWeatherData } from './temperature-weather-data';

export class TemperatureGraphData extends TemperatureWeatherData {
    public timestamp: number;
    constructor(timestamp: number, T: number, TD: number){
        super(T, TD);
        this.timestamp = timestamp;
    }
}