import { BaseData } from './base-data';

export class PrecipitationData extends BaseData {
    value: number = null;

    fromMockData(YYYYMMDD: string, HH: string, RH: number): PrecipitationData {
        this.datetime = this.getDate(YYYYMMDD, HH);
        this.value = RH;
        return this;
    }
}