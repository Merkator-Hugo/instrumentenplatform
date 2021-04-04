import { BaseData } from './base-data';

export class AirData extends BaseData {
    airpressure: number = null;
    cloud_coverage_height: number = null;
    humidity: number = null;
    particulate_matter: number = null;
    wind_direction: number = null;
    wind_speed: number

    fromMockData(date: Date, DD: number, FF: number, P: number, U: number): AirData {
        this.datetime = date;
        this.airpressure = P;
        this.humidity = U;
        this.wind_direction = DD;
        this.wind_speed = FF;
        return this;
    }
}