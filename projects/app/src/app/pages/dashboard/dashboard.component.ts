import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/interfaces';
import { WeatherData, TemperatureData, AirData, AllskyCameraData, MagnetometerData, MeteorData, PrecipitationData, SatelliteImageData, SunData, WeatherForcastData } from '../../models/classes';
import { ComponentType } from '../../models/enums';
import { DataService, StateService, LoadingService, TimeService } from '../../services/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard';
  gridColumns = 3;
  cards: Card[] = [];
  currentData: WeatherData;
  now: Date;

  constructor(
    private dataService: DataService,
    public state: StateService,
    public loading: LoadingService,
    private timeService: TimeService) {
      this.state.setTitle(this.title);
    }

  ngOnInit(): void {
    this.currentData = new WeatherData();
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
    this.cards.push({ type: ComponentType.WIND });
    this.cards.push({ type: ComponentType.PRECIPITATION });
    this.cards.push({ type: ComponentType.AIR });
    this.cards.push({ type: ComponentType.WIDGET, title: 'Webcam', icon: 'fa-camera' });
  }

}
