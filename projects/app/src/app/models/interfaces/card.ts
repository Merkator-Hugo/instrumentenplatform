import { CardData } from './card-data';
import { ComponentType } from '../enums/component-type';

export interface Card {
    data?: CardData;
    component?: any;
    type: ComponentType;
    title?: string;
    icon?: string;
}