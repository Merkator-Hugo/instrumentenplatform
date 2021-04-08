import { Component, OnInit } from '@angular/core';
import { Card, Widget } from '../../models/interfaces';
import { WeatherData } from '../../models/classes';
import { DataType } from '../../models/enums';
import { DataService, StateService, LoadingService, TimeService, AstronomyService } from '../../services/services';

@Component({
  selector: 'app-dashboard3',
  templateUrl: './dashboard3.component.html',
  styleUrls: ['./dashboard3.component.scss']
})
export class Dashboard3Component implements OnInit {

  title = 'Dashboard 3';
  widgets: Widget[];
  gridColumns = 3;
  cards: Card[] = [];
  currentData: WeatherData;
  now: Date;

  constructor(
    private dataService: DataService,
    public state: StateService,
    public loading: LoadingService,
    private timeService: TimeService,
    private astronomy: AstronomyService) {
      this.state.setTitle(this.title);
    }

  ngOnInit(): void {
    this.currentData = new WeatherData();
    this.timeService.tick.subscribe((now) => {
      this.astronomy.setDateTime(now);
      this.dataService.refreshCurrentData(now);
    });
    this.createWidgets();
    // this.dataService.currentDataChanged.subscribe((currentData) => {
    //   this.updateWidgets(currentData)
    // });
  }

  private createWidgets() {
    this.widgets = [];
    this.widgets.push( { 
      type: DataType.TIME, 
      info: '',
      more: '',
      chartsInfo: []
    });
    this.widgets.push( { 
      type: DataType.TEMPERATURE, 
      info: '',
      more: '',
      chartsInfo: []
    });
  }

  private updateWidgets(currentData: WeatherData) {
    for (let w of this.widgets) {
      switch (w.type) {
        case DataType.TEMPERATURE:
          const temp1 = (currentData.temperature.temperature != null) ? currentData.temperature.temperature : '-';
          const temp2 = (currentData.temperature.inside != null) ? currentData.temperature.inside : '-';
          const temp3 = (currentData.temperature.feeling != null) ? currentData.temperature.feeling : '-';
          const temp4 = (currentData.temperature.dewpoint != null) ? currentData.temperature.dewpoint : '-';
          let cat = 0;
          if (temp1 < 5) { cat = 0; }
          else if (temp1 < 15) { cat = 1; }
          else if (temp1 < 25) { cat = 2; }
          else { cat = 3; }
          // w.icon = { type: 'thermometer', value: temp1, height: 100 }, 
          // w.items = [
          //   { label: '', tooltip: '', value: temp1 + ' °C' },
          //   { label: 'Binnen', tooltip: 'Binnentemperatuur', value: temp2 + ' °C' },
          //   { label: 'Gevoel', tooltip: 'Gevoelstemperatuur', value: temp3 + ' °C' },
          //   { label: 'Dauwpunt', tooltip: 'Dauwpunt', value: temp4 + ' °C' }
          // ];
          break;
        case DataType.TIME:
          // w.icon = { type: 'clock', value: this.astronomy.getNow(), height: 100 }, 
          // w.items = [
          //   { label: '', tooltip: '', value: this.astronomy.getDate() },
          //   { label: '', tooltip: '', value: this.astronomy.getTime() },
          //   { label: 'JD', tooltip: 'Julaanse Dag', value: this.astronomy.getJulianDate(2) },
          //   { label: 'GAST', tooltip: 'Greenwich Apparant Sidereal Time', value: this.astronomy.getSideralTime(2) }
          // ];
          break;
      }
    }
  }

}
