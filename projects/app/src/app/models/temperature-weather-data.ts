export class TemperatureWeatherData {
    temperature: number;
    dewpoint: number;
    constructor(T: number, TD: number){
        this.temperature = T;
        this.dewpoint = TD;
    }
}