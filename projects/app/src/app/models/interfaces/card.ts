import { CardData } from './card-data';
import { DataType } from '../enums/data-type';

export interface Card {
    data?: CardData;
    component?: any;
    type: DataType;
    title?: string;
    icon?: string;
}