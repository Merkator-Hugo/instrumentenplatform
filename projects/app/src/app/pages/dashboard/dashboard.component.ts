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
    this.timeService.tick.subscribe((now) => {
      this.astronomy.setDateTime(now);
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
      info: true,
      more: true,
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.TEMPERATURE,
      info: true,
      more: false,
      chartsInfo: [
        {
          charttype: 'line',
          datatype: DataType.TEMPERATURE,
          label: 'Lijn',
        },
        {
          charttype: 'bar',
          datatype: DataType.TEMPERATURE,
          label: 'Balk',
        }
      ]
    });
    this.widgets.push({
      type: DataType.WIND,
      info: true,
      more: false,
      chartsInfo: [
        {
          charttype: 'heatmap',
          datatype: DataType.WIND,
          label: 'Heatmap',
        }
      ]
    });
    this.widgets.push({
      type: DataType.CAMERA,
      info: true,
      more: true,
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.MOON,
      info: true,
      more: true,
      chartsInfo: []
    });
    this.widgets.push({
      type: DataType.SUN,
      info: true,
      more: true,
      chartsInfo: [
        {
          charttype: 'line',
          datatype: DataType.SUN,
          label: 'Lijn',
        },
        {
          charttype: 'bar',
          datatype: DataType.SUN,
          label: 'Balk',
        }
      ]
    });
    this.widgets.push({
      type: DataType.AIR,
      info: true,
      more: false,
      chartsInfo: [
        {
          charttype: 'line',
          datatype: DataType.AIR,
          label: 'Lijn',
        },
        {
          charttype: 'bar',
          datatype: DataType.AIR,
          label: 'Balk',
        }
      ]
    });
    this.widgets.push({
      type: DataType.PRECIPITATION,
      info: true,
      more: false,
      chartsInfo: [
        {
          charttype: 'bar',
          datatype: DataType.PRECIPITATION,
          label: 'Balk',
        }
      ]
    });
    this.widgets.push({
      type: DataType.FORECAST,
      info: true,
      more: false,
      chartsInfo: []
    });
  }

}
