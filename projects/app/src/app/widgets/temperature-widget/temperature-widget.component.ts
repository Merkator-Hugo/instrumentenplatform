import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { CardData } from '../../models/card-data';
import { CardItem } from '../../models/card-item';

@Component({
  selector: 'app-temperature-widget',
  templateUrl: './temperature-widget.component.html',
  styleUrls: ['./temperature-widget.component.scss']
})
export class TemperatureWidgetComponent implements OnInit {

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
