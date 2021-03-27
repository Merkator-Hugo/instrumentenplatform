import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import { createMoon } from 'astronomy-bundle/moon';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { InfoDialogComponent, ChartDialogComponent } from '../../barrels/components';
import { CardItem } from '../../barrels/interfaces';
import { ComponentType, IconType } from '../../barrels/enums';
import { DataService, LoadingService, TimeService } from '../../barrels/services';
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-moon-widget',
  templateUrl: './moon-widget.component.html',
  styleUrls: ['./moon-widget.component.scss']
})
export class MoonWidgetComponent implements OnInit {

  icon: string = 'fa-moon';
  title: string = 'Maan';
  fraction: string = '';
  waxing: string = '';
  items: CardItem[];
  info: string = '';
  chart: ComponentType = ComponentType.MOON;

  constructor(
    private matIconRegistry: MatIconRegistry,
    public dialog: MatDialog,
    private dataService: DataService,
    private loadingService: LoadingService,
    private timeService: TimeService) {
    this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
  }

  ngOnInit(): void {
    this.createItems(new Date());
    this.timeService.tick.subscribe((now) => {
      this.createItems(now);
    });
  }

  private createItems(date: Date) {
    const toi = createTimeOfInterest.fromDate(date);
    const moon = createMoon(toi);
    Promise.all([moon.getIlluminatedFraction(), moon.isWaxing()])
      .then((res) => {
        this.fraction = (res[0] * 100).toFixed(0) + ' %';
        this.waxing = (res[1]) ? 'wassend' : 'afnemend';
        let phases = [
          {
            order: (moon.getUpcomingFirstQuarter().getDayOfYear() - toi.getDayOfYear()),
            object: { key: 'EK', value: this.showDate(moon.getUpcomingFirstQuarter().getDate()) }
          },
          {
            order: (moon.getUpcomingFullMoon().getDayOfYear() - toi.getDayOfYear()),
            object: { key: 'VM', value: this.showDate(moon.getUpcomingFullMoon().getDate()) }
          },
          {
            order: (moon.getUpcomingLastQuarter().getDayOfYear() - toi.getDayOfYear()),
            object: { key: 'LK', value: this.showDate(moon.getUpcomingLastQuarter().getDate()) }
          },
          {
            order: (moon.getUpcomingNewMoon().getDayOfYear() - toi.getDayOfYear()),
            object: { key: 'NM', value: this.showDate(moon.getUpcomingNewMoon().getDate()) }
          }
        ];
        phases.sort((a, b) => { return (a.order > b.order) ? 1 : -1; });
        this.items = [];
        phases.forEach((p) => { this.items.push(p.object) });
      });
  }

  private showDate(date: Date): string {
    let YYYY = date.getFullYear().toString();
    let MM = (date.getMonth() > 8) ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1).toString();
    let DD = (date.getDate() > 9) ? date.getDate().toString() : '0' + date.getDate().toString();
    return DD + '-' + MM + '-' + YYYY;
  }

  private createTempString(value: number) {
    return (value != null) ? value + ' °C' : '- °C'
  }

  openInfoDialog() {
    this.dialog.open(InfoDialogComponent, {
      data: {
        content: `
          <h3>Werkelijke temperatuur</h3>
          <p>De werkelijke temperatuur is de temperatuur zoals gemeten inhet weerstation</p>
          <h3>Gevoelstemperatuur</h3>
          <p>De gevoelstemperatuur wordt berekend door ....</p>
          <h3>Dauwpunt</h3>
          <p>Het dauwpunt wordt berekend door ....</p>
        `
      }
    });
  }

  openGraphDialog() {
    this.loadingService.setLoadingStatus(true);
    let from = new Date(2013, 0, 1);
    let to = new Date(2013, 11, 31);
    this.dataService.getTemperature(from, to).subscribe((ts) => {
      let s0 = [];
      let s1 = [];
      for (let t of ts) {
        const time: number = Number(t.timestamp + '000');
        const temp: number = t.temperature;
        const dauw: number = t.dewpoint;
        s0.push([time, temp]);
        s1.push([time, dauw]);
      }
      let series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
        {
          name: 'werkelijk',
          data: s0
        }
      ];
      this.loadingService.setLoadingStatus(false);
      this.dialog.open(ChartDialogComponent,
        {
          data: {
            series: series
          }
        }
      );
    });
  }

}
