import { IconType } from './icon-type';
import { CardItem } from './card-item';

export interface CardData {
    icon: string;
    icontype?: IconType;
    now: string | Date;
    title: string;
    items: CardItem[];
}