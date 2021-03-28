import { TemperatureData } from './temperature-data';

export class TemperatureChartData extends TemperatureData {
    public timestamp: number;
    constructor(timestamp: number, T: number, TD: number){
        super(); //.fromMockData(T, TD);
        this.timestamp = timestamp;
    }
}