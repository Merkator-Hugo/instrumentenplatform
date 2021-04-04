import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem, ChartInfo } from '../../models/interfaces';
import { DataType } from '../../models/enums';
import { DataService } from '../../services/services';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-forecast-widget',
  templateUrl: './forecast-widget.component.html',
  styleUrls: ['./forecast-widget.component.scss']
})
export class ForecastWidgetComponent implements OnInit {

  icon: string = 'fa-cloud-sun-rain';
  title: string = '';
  now: string = '- °C';;
  categorie: number = 0;
  items: CardItem[];
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private dataService: DataService,
    private translate: TranslateService) {
      // this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
      this.registerForecastIcons()
    }

  ngOnInit(): void {
    this.translate.get('FORECAST').subscribe((res) => {
      this.title = res.TITLE;
    })
    this.info = this.getInfo();
    this.items = [
        { key: 'buiten', value: '- °C'},
        { key: 'dauwpunt', value: '- °C' },
        { key: 'gevoel', value: '- °C'},
        { key: 'binnen', value: '- °C' }
    ];
    this.dataService.currentDataChanged.subscribe((currentData) => {
        this.categorie = this.getCategorie(currentData.temperature.temperature)
        this.now = this.createString(currentData.temperature.temperature, '°C');
        this.items = [
          { key: 'buiten', value: this.createString(currentData.temperature.temperature, '°C') },
          { key: 'dauwpunt', value: this.createString(currentData.temperature.dewpoint, '°C') },
          { key: 'gevoel', value: this.createString(currentData.temperature.feeling, '°C')},
          { key: 'binnen', value: this.createString(currentData.temperature.inside, '°C')},
        ];
    });
  }

  private getCategorie(temp: number): number {
    if (temp < 5) {
      return 0;
    } else if (temp < 15) {
      return 1;
    } else if (temp < 25) {
      return 2;
    } else {
      return 3
    }
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

  private registerForecastIcons() {
    this.matIconRegistry.addSvgIcon('forecast0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-day-showers.svg'));
  }

}

