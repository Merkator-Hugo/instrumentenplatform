import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CardItem } from '../../models/interfaces';

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
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'items': {
            this.createItemlist(changes.items.currentValue);
          }
        }
      }
    }
  }
  
  private createItemlist(items: CardItem[]) {
    if ((items != undefined) || (items != null)) {
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


}
