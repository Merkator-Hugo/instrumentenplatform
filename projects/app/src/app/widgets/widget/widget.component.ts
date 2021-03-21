import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { CardData } from '../../models/card-data';
import { CardItem } from '../../models/card-item';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit, OnChanges {

  @Input() data: CardData;
  items: CardItem[];

  constructor(private matIconRegistry: MatIconRegistry) {}

  ngOnInit(): void {
    const icontype = this.data.icontype || 'fas';
    this.matIconRegistry.setDefaultFontSetClass(icontype);
    this.items = this.data.items;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data) {
      this.items = changes.data.currentValue.items;
    }
  }
}
