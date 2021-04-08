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
  selector: 'app-air-widget',
  templateUrl: './air-widget.component.html',
  styleUrls: ['./air-widget.component.scss']
})
export class AirWidgetComponent implements OnInit {

  icon: string = 'fa-smog';
  title: string = '';
  now: string = '- hPa';;
  items: CardItem[];
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [
    {
      charttype: 'line',
      datatype: DataType.AIR,
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
      this.registerAirIcons();
    }

  ngOnInit(): void {
    this.translate.get('AIR').subscribe((res) => {
      this.title = res.TITLE;
    })
    this.info = this.getInfo();
    this.items = [
      { key: 'luchtdruk', value: '- hPa'},
      { key: 'luchtvochtigheid', value: '- %'},
      { key: 'hoogte wolkendek', value: '- m' },
      { key: 'luchtvervuiling', value: '- %'},
    ];
    this.dataService.currentDataChanged.subscribe((currentData: WeatherData) => {
        this.now = this.createString(currentData.air.airpressure, 'hPa');
        this.items = [
          { key: 'luchtdruk', value: this.createString(currentData.air.airpressure, 'hPa')},
          { key: 'luchtvochtigheid', value: this.createString(currentData.air.humidity, '%') },
          { key: 'hoogte wolkendek', value: this.createString(currentData.air.cloud_coverage_height, 'm') },
          { key: 'luchtvervuiling', value: this.createString(currentData.air.particulate_matter, '%')},
        ];
    });
  }

  private createString(value: number, unit: string) {
    return (value != null) ? value + ' ' + unit : '- ' + unit
  }

  getInfo(): string {
    return `
      <h3>Luchtdruk</h3>
      <p></p>
      <h3>Luchtvochtigheid</h3>
      <p></p>
      <h3>Hoogte wolkendek</h3>
      <p></p>
      <h3>Luchtvervuiling</h3>
      <p></p>
    `
  }

  private registerAirIcons() {
    this.matIconRegistry.addSvgIcon('air0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-barometer.svg'));
  }

}
