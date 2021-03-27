import { Component, OnInit } from '@angular/core';
import { Card } from '../../barrels/interfaces';
import { WeatherData, TemperatureWeatherData } from '../../barrels/classes';
import { ComponentType } from '../../barrels/enums';
import { DataService, StateService, LoadingService, TimeService } from '../../barrels/services';

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
    public state: StateService,
    public loading: LoadingService,
    private timeService: TimeService) { }

  ngOnInit(): void {
    this.state.setTitle(this.title);
    this.currentData = new WeatherData(new TemperatureWeatherData(0, 0));
    this.loadCards();
    this.timeService.tick.subscribe((now) => {
      this.now = now;
      this.dataService.refreshCurrentData(now);
    });
  }

  private loadCards() {
    this.cards = [];
    this.cards.push({ type: ComponentType.TEMPERATURE });
    this.cards.push({ type: ComponentType.TIME });
    this.cards.push({ type: ComponentType.MOON });
    this.cards.push({ type: ComponentType.WIDGET, title: 'Wind', icon: 'fa-wind' });
    this.cards.push({ type: ComponentType.WIDGET, title: 'Regen', icon: 'fa-umbrella' });
    this.cards.push({ type: ComponentType.WIDGET, title: 'Zicht', icon: 'fa-smog' });
    this.cards.push({ type: ComponentType.WIDGET, title: 'Webcam', icon: 'fa-camera' });
  }

}
