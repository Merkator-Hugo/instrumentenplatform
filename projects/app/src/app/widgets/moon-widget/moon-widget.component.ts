import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { createTimeOfInterest } from 'astronomy-bundle/time';
import { createMoon } from 'astronomy-bundle/moon';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { InfoDialogComponent, ChartDialogComponent } from '../../components/components';
import { CardItem, ChartTypeData } from '../../models/interfaces';
import { ComponentType, IconType } from '../../models/enums';
import { DataService, LoadingService, TimeService } from '../../services/services';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-moon-widget',
  templateUrl: './moon-widget.component.html',
  styleUrls: ['./moon-widget.component.scss']
})
export class MoonWidgetComponent implements OnInit {

  icon: string = 'fa-moon';
  title: string = '';
  phase: number = 0;
  fraction: string = '';
  waxing: string = '';
  items: CardItem[];
  info: string = '';
  chartType: ChartTypeData = {
    type: 'line',
    component: ComponentType.MOON,
  };

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private timeService: TimeService,
    private translate: TranslateService) {
    // this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
    this.registerMoonIcons()
  }

  ngOnInit(): void {
    this.translate.get('MOON').subscribe((res) => {
      this.title = res.TITLE;
    })
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
        this.phase = Math.floor((res[0] * 28));
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

  private registerMoonIcons() {
    this.matIconRegistry.addSvgIcon('moon0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-new.svg'));
    this.matIconRegistry.addSvgIcon('moon1', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-1.svg'));
    this.matIconRegistry.addSvgIcon('moon2', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-2.svg'));
    this.matIconRegistry.addSvgIcon('moon3', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-3.svg'));
    this.matIconRegistry.addSvgIcon('moon4', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-4.svg'));
    this.matIconRegistry.addSvgIcon('moon5', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-5.svg'));
    this.matIconRegistry.addSvgIcon('moon6', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-6.svg'));
    this.matIconRegistry.addSvgIcon('moon7', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-first-quarter-.svg'));
    this.matIconRegistry.addSvgIcon('moon8', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-1.svg'));
    this.matIconRegistry.addSvgIcon('moon9', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-2.svg'));
    this.matIconRegistry.addSvgIcon('moon10', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-3.svg'));
    this.matIconRegistry.addSvgIcon('moon11', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-4.svg'));
    this.matIconRegistry.addSvgIcon('moon12', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-5.svg'));
    this.matIconRegistry.addSvgIcon('moon13', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-6.svg'));
    this.matIconRegistry.addSvgIcon('moon14', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-full.svg'));
    this.matIconRegistry.addSvgIcon('moon15', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-1.svg'));
    this.matIconRegistry.addSvgIcon('moon16', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-2.svg'));
    this.matIconRegistry.addSvgIcon('moon17', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-3.svg'));
    this.matIconRegistry.addSvgIcon('moon18', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-4.svg'));
    this.matIconRegistry.addSvgIcon('moon19', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-5.svg'));
    this.matIconRegistry.addSvgIcon('moon20', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-6.svg'));
    this.matIconRegistry.addSvgIcon('moon21', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-third-quarter.svg'));
    this.matIconRegistry.addSvgIcon('moon22', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-1.svg'));
    this.matIconRegistry.addSvgIcon('moon23', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-2.svg'));
    this.matIconRegistry.addSvgIcon('moon24', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-3.svg'));
    this.matIconRegistry.addSvgIcon('moon25', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-4.svg'));
    this.matIconRegistry.addSvgIcon('moon26', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-5.svg'));
    this.matIconRegistry.addSvgIcon('moon27', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-6.svg'));
    this.matIconRegistry.addSvgIcon('moon28', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-new.svg'));
  }

}
