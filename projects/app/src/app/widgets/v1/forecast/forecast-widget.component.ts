import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem, ChartInfo } from '../../../models/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TameteoService } from '../../../services/tameteo.service';

@Component({
  selector: 'app-forecast-widget',
  templateUrl: './forecast-widget.component.html',
  styleUrls: ['./forecast-widget.component.scss']
})
export class ForecastWidgetComponent implements OnInit {

  icon: string = 'fa-cloud-sun-rain';
  title: string = '';
  now: string = '';
  items: CardItem[];
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private tameteo: TameteoService,
    private translate: TranslateService) {
      // this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
      this.registerForecastIcons()
    }

  ngOnInit(): void {
    this.translate.get('FORECAST').subscribe((res) => {
      this.title = res.TITLE;
    })
    this.info = this.getInfo();
    this.items = [];
    this.tameteo.getData();
    this.tameteo.forecastChanged.subscribe((data) => {
      this.items = [
        { key: data[0].description, value: '' },
        { key: 'Temperatuur', value: data[0].tempmin + ' °C / ' + data[0].tempmax + ' °C' },
        { key: 'Windsnelheid', value: data[0].windspeed + ' km/uur' },
        { key: 'Regen', value: data[0].rain + ' mm' },
        { key: 'Luchtdruk', value: data[0].pressure + ' mb' },
      ]
        // this.items = [];
        // data.forEach((d) => {
        //   this.items.push(
        //     { key: d.name, value: 'forecast0', html: true },
        //   )
        // })
    });
  }

  getInfo(): string {
    return `
      <h3>Weersvoorspelling</h3>
      <p>Opgehaald via Tameteo.com</p>
    `
  }

  private registerForecastIcons() {
    this.matIconRegistry.addSvgIcon('forecast0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-day-showers.svg'));
  }

}

