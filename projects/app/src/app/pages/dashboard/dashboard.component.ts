import { Component, OnInit } from '@angular/core';
import { TemperatureWidgetComponent } from '../../widgets/temperature-widget/temperature-widget.component';
import { Card } from '../../models/card';
import { ComponentType } from '../../models/component-type';
import { CardData } from '../../models/card-data';
import { DataService } from '../../services/data.service';
import { TimeWidgetComponent } from '../../widgets/time-widget/time-widget.component';
import { WidgetComponent } from '../../widgets/widget/widget.component';
import { SettingsService } from '../../services/settings.service';
import { IconType } from '../../models/icon-type';
import { WeatherData } from '../../models/weather-data';
import { TemperatureWeatherData } from '../../models/temperature-weather-data';
import { LoadingService } from '../../services/loading.service';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard Halley Instrumenten Platform';
  gridColumns = 3;
  cards: Card[] = [];
  currentData: WeatherData;
  now: Date;

  constructor(
    private dataService: DataService,
    public settings: SettingsService,
    public loading: LoadingService,
    private timeService: TimeService) { }

  ngOnInit(): void {
    this.currentData = new WeatherData(new TemperatureWeatherData(0, 0));
    this.loadCards();
    this.timeService.tick.subscribe((now) => {
      this.now = now;
      this.dataService.refreshCurrentData(now);
    });
  }

  private loadCards() {
    this.cards = [];
    // this.cards.push(this.getCardData(ComponentType.WIDGET, 'TODO'));
    this.cards.push(this.getCardData(ComponentType.TEMPERATURE));
    this.cards.push(this.getCardData(ComponentType.TIME));
    this.cards.push(this.getCardData(ComponentType.WIDGET, 'Maan', 'fa-moon'));
    this.cards.push(this.getCardData(ComponentType.WIDGET, 'Wind', 'fa-wind'));
    this.cards.push(this.getCardData(ComponentType.WIDGET, 'Regen', 'fa-umbrella'));
    this.cards.push(this.getCardData(ComponentType.WIDGET, 'Zicht', 'fa-smog'));
    this.cards.push(this.getCardData(ComponentType.WIDGET, 'Webcam', 'fa-camera'));
  }

  // private getCurrentData(now: Date) {
  //   this.currentData = this.dataService.getCurrentData(now);
  // }

  toggleMenu() {}

  onSpeedChange(e) {
    this.settings.setSpeed(e);
  }


  private getCardData(type: ComponentType, title?: string, icon?: string, regular?: boolean): Card {
    let d: CardData;
    switch (type) {
      case ComponentType.WIDGET:
        d = {
          icon: (icon != undefined) ? icon : 'fa-times-circle',
          icontype: ((regular != undefined) || (regular == true)) ? IconType.REGULAR : IconType.SOLID,
          now: '',
          title: title || 'LEEG',
          items: [],
          //   { key: 'gevoelstemp uitrekenen', value: ''},
          //   { key: 'tijden uitrekenen en tonen', value: ''},
          //   { key: 'klok tonen', value: ''},
          //   { key: 'Juiste widgets maken', value: ''},
          //   { key: 'bar grafiek maken', value: ''},
          //   { key: 'wind grafiek maken', value: ''},
          //   { key: 'meer data aansluiten', value: ''},
          //   { key: 'harmonica-layout mobiel', value: ''},
          //   { key: 'menu: settings', value: ''},
          //   { key: 'menu: cards verplaatsen', value: ''},
          //   { key: '', value: ''},
          //   { key: '', value: ''},
          //   { key: '', value: ''},
          //   { key: '', value: ''},
          //   { key: '', value: ''},
          //   { key: '', value: ''}
          // ]
        };
        return {
          data: d,
          component: WidgetComponent,
          type: type
        }
      case ComponentType.TEMPERATURE:
        d = {
          icon: 'fa-thermometer-half',
          now: this.currentData.temperature.temperature + ' °C',
          title: 'Temperatuur',
          items: [
            { key: 'buiten', value: this.currentData.temperature.temperature + ' °C'},
            { key: 'dauwpunt', value: this.currentData.temperature.dewpoint + ' °C' },
            { key: 'gevoel', value: '6 °C'},
            { key: 'binnen', value: '18 °C' }
          ]
        };
        return {
          data: d,
          component: TemperatureWidgetComponent,
          type: type
        }
      case ComponentType.TIME:
        d = {
          icon: 'fa-clock',
          icontype: IconType.REGULAR,
          now: this.now,
          title: 'Datum en Tijd',
          items: [
            { key: 'buiten', value: '7 C'},
            { key: 'dauwpunt', value: '4 C' },
            { key: 'gevoel', value: '6 C'},
            { key: 'binnen', value: '18 C' }
          ]
        };
        return {
          data: d,
          component: TimeWidgetComponent,
          type: type
        }
      }
  }

}
