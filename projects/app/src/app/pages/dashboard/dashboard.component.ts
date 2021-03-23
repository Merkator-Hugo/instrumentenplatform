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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard Halley Instrumenten Platform';
  gridColumns = 3;
  cards: Card[] = [];
  now: WeatherData;

  constructor(private dataService: DataService,
              public settings: SettingsService) { }

  ngOnInit(): void {
    this.now = new WeatherData(new TemperatureWeatherData(0, 0));
    setInterval(() => {this.getNow();this.loadCards();}, 1000);
  }

  private loadCards() {
    this.cards = [];
    let card0 = this.getCardData(ComponentType.WIDGET, 'TODO');
    let card1 = this.getCardData(ComponentType.TEMPERATURE);
    let card2 = this.getCardData(ComponentType.TIME);
    this.cards.push(card0);
    this.cards.push(card2);
    this.cards.push(card1);
    this.cards.push(card2);
    this.cards.push(card1);
    this.cards.push(card1);
    this.cards.push(card2);
  }

  private getNow() {
    this.now = this.dataService.getNow();
  }

  toggleMenu() {}


  private getCardData(type: ComponentType, title?: string): Card {
    let d: CardData;
    switch (type) {
      case ComponentType.WIDGET:
        d = {
          icon: 'fa-times-circle',
          icontype: IconType.REGULAR,
          now: '',
          title: title || 'LEEG',
          items: [
            { key: 'knoppen voor Speed', value: ''},
            { key: 'speed in settings', value: ''},
            { key: 'gevoelstemp uitrekenen', value: ''},
            { key: 'tijden uitrekenen en tonen', value: ''},
            { key: 'klok tonen', value: ''},
            { key: 'Juiste widgets maken', value: ''},
            { key: 'Info popup maken', value: ''},
            { key: 'lijn grafiek', value: ''},
            { key: 'bar grafiek maken', value: ''},
            { key: 'wind grafiek maken', value: ''},
            { key: 'meer data aansluiten', value: ''},
            { key: 'harmonica-layout mobiel', value: ''},
            { key: 'menu: settings', value: ''},
            { key: 'menu: cards verplaatsen', value: ''},
            { key: '', value: ''},
            { key: '', value: ''},
            { key: '', value: ''},
            { key: '', value: ''},
            { key: '', value: ''},
            { key: '', value: ''}
          ]
        };
        return {
          data: d,
          component: WidgetComponent,
          type: type
        }
      case ComponentType.TEMPERATURE:
        d = {
          icon: 'fa-thermometer-half',
          now: this.now.temperature.temperature + ' °C',
          title: 'Temperatuur',
          items: [
            { key: 'buiten', value: this.now.temperature.temperature + ' °C'},
            { key: 'dauwpunt', value: this.now.temperature.dewpoint + ' °C' },
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
          now: this.dataService.getTime(60).toString(),
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
