import { WeatherData } from './weather-data';

export class DataEventinfo {
    status: string;
    data: WeatherData;
    constructor(status: string, data: WeatherData){
        this.status = status;
        this.data = data;
    }
}