import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { CardData } from '../../models/card-data';
import { CardItem } from '../../models/card-item';

@Component({
  selector: 'app-time-widget',
  templateUrl: './time-widget.component.html',
  styleUrls: ['./time-widget.component.scss']
})
export class TimeWidgetComponent implements OnInit {

  @Input() data: CardData;
  date: string;
  time: string;
  items: CardItem[];

  constructor(private matIconRegistry: MatIconRegistry) {}


  ngOnInit(): void {
    const icontype = this.data.icontype || 'fas';
    this.matIconRegistry.setDefaultFontSetClass(icontype);
    this.items = this.data.items;
    this.createDateTime(this.data.now);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data) {
      this.items = changes.data.currentValue.items;
    }
  }

  private createDateTime(now: string): void {
    const dt = new Date(now);
    const DD = (dt.getDate() > 9) ? dt.getDate().toString() : '0' + dt.getDate().toString();
    const MM = (dt.getMonth() > 8) ? (dt.getMonth()+ 1).toString() : '0' + (dt.getMonth()+ 1).toString();
    const YY = dt.getFullYear().toString().substring(2,4);
    this.date = (DD + '-' + MM + '-' + YY);
    const hh = (dt.getHours() > 9) ? dt.getHours().toString() : '0' + dt.getHours().toString();
    const mm = (dt.getMinutes() > 9) ? dt.getMinutes().toString() : '0' + dt.getMinutes().toString();
    const ss = (dt.getSeconds() > 9) ? dt.getSeconds().toString() : '0' + dt.getSeconds().toString();
    this.time = (hh + ':' + mm + ':' + ss);

  }
}
