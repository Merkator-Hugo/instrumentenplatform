export class WeatherForcastData {
    id: number = null;
    datetime: Date = null;
    forecast: string = '';

    fromMockData(): WeatherForcastData {
        return this;
    }
}