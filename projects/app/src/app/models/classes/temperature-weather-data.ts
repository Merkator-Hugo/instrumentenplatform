export class TemperatureWeatherData {
    temperature: number;
    dewpoint: number;
    feeling: number = null;
    inside: number = null;
    constructor(T: number, TD: number){
        this.temperature = T;
        this.dewpoint = TD;
    }
}