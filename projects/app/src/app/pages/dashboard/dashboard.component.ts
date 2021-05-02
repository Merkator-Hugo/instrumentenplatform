import { Component, OnInit } from '@angular/core';
import { Card, Widget } from '../../models/interfaces';
import { WeatherData } from '../../models/classes';
import { DataType } from '../../models/enums';
import { DataService, StateService, LoadingService, TimeService, AstronomyService, TameteoService } from '../../services/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Dashboard';
  widgets: Widget[];
  gridColumns = 3;
  cards: Card[] = [];
  currentData: WeatherData;
  now: Date;
  mobile: boolean = false;
  public activeWidget = -1;

  constructor(
    private dataService: DataService,
    public state: StateService,
    public loading: LoadingService,
    private timeService: TimeService,
    private astronomy: AstronomyService,
    private tameteo: TameteoService) {
    this.state.setTitle(this.title);
  }

  ngOnInit(): void {
    if (window.screen.width < 781) { // 768px portrait
      this.mobile = true;
    }
  
    this.currentData = new WeatherData();
    // this.tameteo.getData();
    this.timeService.tick.subscribe((now) => {
      this.astronomy.setDateTime(now);
      this.dataService.refreshCurrentData(now);
    });
    this.createWidgets();
  }

  setOpened(itemIndex) {
    this.activeWidget = itemIndex;
  }

  setClosed(itemIndex) {
    if(this.activeWidget === itemIndex) {
      this.activeWidget = -1;
    }
  }

  private createWidgets() {
    this.widgets = [];
    this.widgets.push({
      type: DataType.TIME,
      info: '',
      more: '',
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.TEMPERATURE,
      info: '',
      more: '',
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.WIND,
      info: '',
      more: '',
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.CAMERA,
      info: '',
      more: '',
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.MOON,
      info: '',
      more: '',
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.SUN,
      info: '',
      more: '',
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.AIR,
      info: '',
      more: '',
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.PRECIPITATION,
      info: '',
      more: '',
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.FORECAST,
      info: '',
      more: '',
      chartsInfo: []
    });
  }

}
