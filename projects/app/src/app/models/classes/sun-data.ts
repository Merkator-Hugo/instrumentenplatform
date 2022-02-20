import { BaseData } from './base-data';

export class SunData  extends BaseData {
    radiation: number = null;
    uvindex: number = null

    fromMockData(datetime: Date, radiation: number
    ) {
        this.datetime = datetime;
        this.radiation = radiation;
        this.uvindex = null;
        return this;
    }

    fromHalleyData(date: Date, radiation: number, uvindex: number): SunData {
        this.datetime = date;
        this.radiation = radiation;
        this.uvindex = uvindex;
        return this;
    }

}