import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem, ChartInfo } from '../../models/interfaces';
import { DataType } from '../../models/enums';
import { DataService } from '../../services/services';
import { TranslateService } from '@ngx-translate/core';
import { WeatherData } from '../../models/classes';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-wind-widget',
  templateUrl: './wind-widget.component.html',
  styleUrls: ['./wind-widget.component.scss']
})
export class WindWidgetComponent implements OnInit {

  icon: string = 'fa-wind';
  title: string = '';
  now: string = '- m/s';;
  items: CardItem[];
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [
    {
      charttype: 'line',
      datatype: DataType.WIND,
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
      this.registerWindIcons();
    }

  ngOnInit(): void {
    this.translate.get('WIND').subscribe((res) => {
      this.title = res.TITLE;
    })
    this.info = this.getInfo();
    this.items = [
      { key: 'snelheid', value: '- m/s'},
      { key: 'richting', value: '- °' },
    ];
    this.dataService.currentDataChanged.subscribe((currentData: WeatherData) => {
      this.now = this.createString(currentData.air.wind_speed, 'm/s');
      this.items = [
        { key: 'snelheid', value: this.createString(currentData.air.wind_speed, 'm/s') },
        { key: 'richting', value: this.createString(currentData.air.wind_direction, '°') },
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

  private registerWindIcons() {
    this.matIconRegistry.addSvgIcon('wind0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-strong-wind.svg'));
  }

}
