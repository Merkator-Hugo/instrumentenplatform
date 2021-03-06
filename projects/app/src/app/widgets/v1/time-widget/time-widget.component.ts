import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem, ChartInfo } from '../../../models/interfaces';
import { DataType, IconType } from '../../../models/enums';
import { DataService, SettingsService, TimeService } from '../../../services/services';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import { createMoon } from 'astronomy-bundle/moon';
import {createLocation} from 'astronomy-bundle/earth';
import {angleCalc} from 'astronomy-bundle/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-time-widget',
  templateUrl: './time-widget.component.html',
  styleUrls: ['./time-widget.component.scss']
})
export class TimeWidgetComponent implements OnInit {

  icon: string = 'fa-clock';
  iconType: string = IconType.SOLID;
  title: string = '';
  now: Date;
  weekday: string = '';
  date: string = '';
  time: string = '';
  items: CardItem[] = [];
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [];
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private dataService: DataService,
    private timeService: TimeService,
    private settings: SettingsService,
    private translate: TranslateService) {
      this.matIconRegistry.setDefaultFontSetClass(this.iconType);
    }

  ngOnInit(): void {
    this.translate.get('DATEANDTIME').subscribe((res) => {
      this.title = res.TITLE;
    })
    this.items = [
        { key: 'juliaans', value: '-' },
        { key: 'sideraal', value: '-'},
    ];
    // this.timeService.tick.subscribe((now) => {
    //   this.now = now;
    //   this.createItems(now);
    //   this.createDateTime(now);
    // });
    this.dataService.currentDataChanged.subscribe((currentData) => {
      this.now = currentData.datetime;
      this.createItems(currentData.datetime);
      this.createDateTime(currentData.datetime);
    });
  }

  private createItems(date: Date) {
    const toi = createTimeOfInterest.fromDate(date);
    const moon = createMoon(toi);
    const here = this.settings.getLocation();
    const location = createLocation(here[0], here[1]);
    Promise.all([moon.getIlluminatedFraction(), moon.isWaxing()])
      .then((res) => {
        this.items = [
          { key: 'juliaans', value: toi.getJulianDay().toFixed(2) },
          { key: 'sideraal', value: angleCalc.deg2time(toi.getLocalMeanSiderealTime(location))},
      ];
        });
}

  private createDateTime(now: Date): void {
    const weekdays = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
    this.weekday = weekdays[(now.getDay())];
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
