import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { CardData } from '../../models/card-data';
import { CardItem } from '../../models/card-item';
import { IconType } from '../../models/icon-type';
import { DataService } from '../../services/data.service';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-time-widget',
  templateUrl: './time-widget.component.html',
  styleUrls: ['./time-widget.component.scss']
})
export class TimeWidgetComponent implements OnInit {

  icon: string;
  title: string;
  now: Date;
  date: string;
  time: string;
  items: CardItem[];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private dataService: DataService,
    private timeService: TimeService) {
      this.matIconRegistry.setDefaultFontSetClass(IconType.REGULAR);
    }

  ngOnInit(): void {
    this.icon = 'fa-clock';
    this.title = 'Datum en Tijd';
    this.items = [
        // { key: 'buiten', value: '7 C'},
        // { key: 'dauwpunt', value: '4 C' },
        // { key: 'gevoel', value: '6 C'},
        // { key: 'binnen', value: '18 C' }
    ];
    this.timeService.tick.subscribe((now) => {
      this.createDateTime(now);
    });
    this.dataService.currentDataChanged.subscribe((currentData) => {
      // this.items = currentData.items;
    });
  }

  private createDateTime(now: Date): void {
    const DD = (now.getDate() > 9) ? now.getDate().toString() : '0' + now.getDate().toString();
    const MM = (now.getMonth() > 8) ? (now.getMonth()+ 1).toString() : '0' + (now.getMonth()+ 1).toString();
    const YY = now.getFullYear().toString().substring(2,4);
    this.date = (DD + '-' + MM + '-' + YY);
    const hh = (now.getHours() > 9) ? now.getHours().toString() : '0' + now.getHours().toString();
    const mm = (now.getMinutes() > 9) ? now.getMinutes().toString() : '0' + now.getMinutes().toString();
    const ss = (now.getSeconds() > 9) ? now.getSeconds().toString() : '0' + now.getSeconds().toString();
    this.time = (hh + ':' + mm + ':' + ss);

  }
}
