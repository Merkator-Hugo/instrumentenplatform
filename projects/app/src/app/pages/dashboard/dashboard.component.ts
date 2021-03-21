import { Component, OnInit } from '@angular/core';
import { TemperatureWidgetComponent } from '../../widgets/temperature-widget/temperature-widget.component';
import { Card } from '../../models/card';
import { ComponentType } from '../../models/component-type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard Halley Instrumenten Platform';
  gridColumns = 3;
  cards: Card[] = [];

  constructor() { }

  ngOnInit(): void {
    const data = {
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
    const card = {
      data: data,
      component: TemperatureWidgetComponent,
      type: ComponentType.WIDGET
    }
    this.cards.push(card);
    this.cards.push(card);
    this.cards.push(card);
    this.cards.push(card);
    this.cards.push(card);
    this.cards.push(card);
    this.cards.push(card);
  }

  toggleMenu() {}

}
