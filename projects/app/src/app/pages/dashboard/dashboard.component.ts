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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard Halley Instrumenten Platform';
  gridColumns = 3;
  cards: Card[] = [];

  constructor(private dataService: DataService,
              private settings: SettingsService) { }

  ngOnInit(): void {
    let card0 = this.getCardData(ComponentType.WIDGET, 'TEST');
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
          items: []
        };
        return {
          data: d,
          component: WidgetComponent,
          type: type
        }
      case ComponentType.TEMPERATURE:
        d = {
          icon: 'fa-thermometer-half',
          now: '7 C',
          title: 'Temperatuur',
          items: [
            { key: 'buiten', value: '7 C'},
            { key: 'dauwpunt', value: '4 C' },
            { key: 'gevoel', value: '6 C'},
            { key: 'binnen', value: '18 C' }
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
          now: this.dataService.time.toString(),
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
