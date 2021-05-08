import { BaseData } from './base-data';

export class PrecipitationData extends BaseData {
    value: number = null;

    fromMockData(date: Date, RH: number): PrecipitationData {
        this.datetime = date;
        this.value = RH;
        return this;
    }

    fromHalleyData(
        datetime: Date,
        value: number
    ) {
        this.datetime = datetime;
        this.value = value;
        return this;
    }

}