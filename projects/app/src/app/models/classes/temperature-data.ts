import { BaseData } from './base-data';

export class TemperatureData  extends BaseData {
    temperature: number = null;
    dewpoint: number = null;
    feeling: number = null;
    inside: number = null;

    fromMockData(YYYYMMDD: string, HH: string, T: number, TD: number): TemperatureData {
        this.datetime = this.getDate(YYYYMMDD, HH);
        this.temperature = T;
        this.dewpoint = TD;
        return this;
    }
}