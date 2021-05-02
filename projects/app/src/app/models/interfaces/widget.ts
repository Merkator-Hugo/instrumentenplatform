import { DataType } from '../enums/data-type'
import { ChartInfo } from "./chart-info";

export interface Widget {
    type: DataType;
    info: boolean;
    more: boolean;
    chartsInfo: ChartInfo[];
}