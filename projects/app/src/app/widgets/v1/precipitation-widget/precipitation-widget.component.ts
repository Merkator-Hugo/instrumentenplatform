import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem, ChartInfo } from '../../../models/interfaces';
import { DataType } from '../../../models/enums';
import { DataService } from '../../../services/services';
import { TranslateService } from '@ngx-translate/core';
import { WeatherData } from '../../../models/classes';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-precipitation-widget',
  templateUrl: './precipitation-widget.component.html',
  styleUrls: ['./precipitation-widget.component.scss']
})
export class PrecipitationWidgetComponent implements OnInit {

  icon: string = 'fa-umbrella';
  title: string = '';
  now: string = '- mm';;
  items: CardItem[];
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [
    {
      charttype: 'bar',
      datatype: DataType.PRECIPITATION,
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
      this.registerPrecipitationIcons()
    }

  ngOnInit(): void {
    this.translate.get('PRECIPITATION').subscribe((res) => {
      this.title = res.TITLE;
    })
    this.info = this.getInfo();
    this.items = [
      { key: 'hoeveelheid', value: '- mm/u'},
    ];
    this.dataService.currentDataChanged.subscribe((currentData: WeatherData) => {
        this.now = this.createString(currentData.precipitation.value, 'mm/u');
        this.items = [
          { key: 'hoeveelheid', value: this.createString(currentData.precipitation.value, 'mm/u')},
        ];
    });
  }

  private createString(value: number, unit: string) {
    return (value != null) ? value + ' ' + unit : '- ' + unit
  }

  getInfo(): string {
    return `
      <h3>Werkelijke temperatuur</h3>
      <p>De werkelijke temperatuur is de temperatuur zoals gemeten inhet weerstation</p>
      <h3>Gevoelstemperatuur</h3>
      <p>De gevoelstemperatuur wordt berekend door ....</p>
      <h3>Dauwpunt</h3>
      <p>Het dauwpunt wordt berekend door ....</p>
    `
  }

  private registerPrecipitationIcons() {
    this.matIconRegistry.addSvgIcon('precipitation0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-umbrella.svg'));
  }

}
