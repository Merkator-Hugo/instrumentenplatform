import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/interfaces';
import { WeatherData } from '../../models/classes';
import { DataType } from '../../models/enums';
import { DataService, StateService, LoadingService, TimeService, AstronomyService } from '../../services/services';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})
export class Dashboard2Component implements OnInit {

  title = 'Dashboard 2';
  smallWidgets: {type: DataType; icon: string; items: { label: string; tooltip: string; value: string}[] }[];
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
    this.loadCards();
    this.timeService.tick.subscribe((now) => {
      this.astronomy.setDateTime(now);
      this.dataService.refreshCurrentData(now);
    });
    this.createSmallWidgets();
    this.dataService.currentDataChanged.subscribe((currentData) => {
      this.updateSmallWidgets(currentData)
    });
  }

  private createSmallWidgets() {
    this.smallWidgets = [];
    this.smallWidgets.push( { 
      type: DataType.TIME, 
      icon: '', 
      items: [ 
        { label: '', tooltip: '', value: '-' },
        { label: '', tooltip: '', value: '-' },
        { label: '', tooltip: '', value: '-' }, 
        { label: '', tooltip: '', value: '-' }
      ] 
    });
    this.smallWidgets.push( { 
      type: DataType.TEMPERATURE, 
      icon: 'temperature0', 
      items: [ 
        { label: '', tooltip: '', value: '- °C' }, 
        { label: '', tooltip: '', value: '- °C' }, 
        { label: '', tooltip: '', value: '- °C' }, 
        { label: '', tooltip: '', value: '- °C' } 
      ] 
    });
  }

  private updateSmallWidgets(currentData: WeatherData) {
    for (let w of this.smallWidgets) {
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
          w.icon = 'temperature' + cat;
          w.items = [
            { label: '', tooltip: '', value: temp1 + ' °C' },
            { label: 'Binnen', tooltip: 'Binnentemperatuur', value: temp2 + ' °C' },
            { label: 'Gevoel', tooltip: 'Gevoelstemperatuur', value: temp3 + ' °C' },
            { label: 'Dauwpunt', tooltip: 'Dauwpunt', value: temp4 + ' °C' }
          ];
          break;
        case DataType.TIME:
          w.items = [
            { label: '', tooltip: '', value: this.astronomy.getDate() },
            { label: '', tooltip: '', value: this.astronomy.getTime() },
            { label: 'JD', tooltip: 'Julaanse Dag', value: this.astronomy.getJulianDate(2) },
            { label: 'GAST', tooltip: 'Greenwich Apparant Sidereal Time', value: this.astronomy.getSideralTime(2) }
          ];
          break;
      }
    }
  }

  private loadCards() {
    this.cards = [];
    this.cards.push({ type: DataType.TEMPERATURE });
    this.cards.push({ type: DataType.TIME });
    this.cards.push({ type: DataType.MOON });
    this.cards.push({ type: DataType.WIND });
    this.cards.push({ type: DataType.PRECIPITATION });
    this.cards.push({ type: DataType.AIR });
    this.cards.push({ type: DataType.SUN });
    this.cards.push({ type: DataType.CAMERA });
    this.cards.push({ type: DataType.FORECAST });
    // this.cards.push({ type: DataType.WIDGET, title: 'Webcam', icon: 'fa-camera' });
  }

}
