import { BaseData } from './base-data';

export class TemperatureData  extends BaseData {
    temperature: number = null;
    dewpoint: number = null;
    feeling: number = null;
    inside: number = null;

    fromMockData(date: Date, T: number, TD: number): TemperatureData {
        this.datetime = date;
        this.temperature = T;
        this.dewpoint = TD;
        return this;
    }
}