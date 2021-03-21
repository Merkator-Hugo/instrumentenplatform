import { CardData } from './card-data';
import { ComponentType } from './component-type';

export interface Card {
    data: CardData;
    component: any;
    type: ComponentType;
}