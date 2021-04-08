import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem, ChartInfo } from '../../../models/interfaces';
import { DataType } from '../../../models/enums';
import { DataService } from '../../../services/services';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sun-widget',
  templateUrl: './sun-widget.component.html',
  styleUrls: ['./sun-widget.component.scss']
})
export class SunWidgetComponent implements OnInit {

  icon: string = 'fa-sun';
  title: string = '';
  now: string = '- °C';;
  categorie: number = 0;
  items: CardItem[];
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [
    {
      charttype: 'line',
      datatype: DataType.SUN,
      label: 'Lijn',
    }
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private dataService: DataService,
    private translate: TranslateService) {
      // this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
      this.registerSunIcons()
    }

  ngOnInit(): void {
    this.translate.get('SUN').subscribe((res) => {
      this.title = res.TITLE;
    })
    this.info = this.getInfo();
    this.items = [
        { key: 'duur', value: '- u/u'},
    ];
    this.dataService.currentDataChanged.subscribe((currentData) => {
        this.now = this.createString(currentData.sun.value, 'u/u');
        this.items = [
          { key: 'duur', value: this.createString(currentData.sun.value, 'u/u') },
        ];
    });
  }

  private createString(value: number, unit: string) {
    return (value != null) ? value + ' ' + unit : '- ' + unit
  }

  getInfo(): string {
    return `
      <h3>Duur</h3>
      <p>Aantal uur zonneschijn in dit uurvak</p>
    `
  }

  private registerSunIcons() {
    this.matIconRegistry.addSvgIcon('sun0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-day-sunny.svg'));
  }

}

