import { WidgetItem } from "./widget-item";
import { DataType } from '../enums/data-type'
import { ChartInfo } from "./chart-info";
import { WidgetIcon } from "./widget-icon";


export interface Widget {
    type: DataType;
    info: string;
    more: string;
    chartsInfo: ChartInfo[];
}