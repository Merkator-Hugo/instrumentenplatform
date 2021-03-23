import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Card } from '../../models/card';
import { CardItem } from '../../models/card-item';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit {

  @Input() items: CardItem[];
  itemlist: CardItem[];

  constructor() { }

  ngOnInit(): void {
    this.createItemlist(this.items);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data) {
      let d = changes.data.currentValue;
      this.createItemlist(d.items);
    }
  }

  private createItemlist(items: CardItem[]) {
    if (items.length <= 6) {
      this.itemlist = items;
      if (items.length < 6) {
        for (let i = items.length; i < 6; i++) {
          this.itemlist.unshift({ empty: true, key: '', value: ''});
        }
      }
    } else if (items.length > 6) {
      this.itemlist = items.slice(0,6);
    }
  }


}
