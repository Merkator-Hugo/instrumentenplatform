import { CardItem } from './card-item';

export interface CardData {
    icon: string;
    now: string;
    title: string;
    items: CardItem[];
}