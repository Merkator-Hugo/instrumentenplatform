import { BaseData } from './base-data';

export class SunData  extends BaseData {
    value: number = null;
    brightness: number = null

    fromMockData(date: Date, SQ: number): SunData {
        this.datetime = date;
        this.value = SQ;
        return this;
    }
}