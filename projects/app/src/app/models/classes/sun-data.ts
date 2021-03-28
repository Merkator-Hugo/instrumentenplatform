import { BaseData } from './base-data';

export class SunData  extends BaseData {
    value: number = null;
    brightness: number = null

    fromMockData(YYYYMMDD: string, HH: string, SQ: number): SunData {
        this.datetime = this.getDate(YYYYMMDD, HH);
        this.value = SQ;
        return this;
    }
}