import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem, ChartTypeData } from '../../models/interfaces';
import { ComponentType, IconType } from '../../models/enums';
import { DataService, LoadingService } from '../../services/services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-temperature-widget',
  templateUrl: './temperature-widget.component.html',
  styleUrls: ['./temperature-widget.component.scss']
})
export class TemperatureWidgetComponent implements OnInit {

  icon: string = 'fa-thermometer-half';
  title: string = '';
  now: string = '- °C';;
  items: CardItem[];
  info: string = '';
  chartType: ChartTypeData = {
    type: 'line',
    component: ComponentType.TEMPERATURE,
  };

  constructor(
    private matIconRegistry: MatIconRegistry,
    public dialog: MatDialog,
    private dataService: DataService,
    private translate: TranslateService) {
      this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
    }

  ngOnInit(): void {
    this.translate.get('TEMPERATURE').subscribe((res) => {
      this.title = res.TITLE;
    })
    this.info = this.getInfo();
    this.items = [
        { key: 'buiten', value: '- °C'},
        { key: 'dauwpunt', value: '- °C' },
        { key: 'gevoel', value: '- °C'},
        { key: 'binnen', value: '- °C' }
    ];
    this.dataService.currentDataChanged.subscribe((currentData) => {
        this.now = this.createString(currentData.temperature.temperature, '°C');
        this.items = [
          { key: 'buiten', value: this.createString(currentData.temperature.temperature, '°C') },
          { key: 'dauwpunt', value: this.createString(currentData.temperature.dewpoint, '°C') },
          { key: 'gevoel', value: this.createString(currentData.temperature.feeling, '°C')},
          { key: 'binnen', value: this.createString(currentData.temperature.inside, '°C')},
        ];
    });
  }

  private createString(value: number, unit: string) {
    return (value != null) ? value + ' ' + unit : '- ' + unit
  }

  getInfo(): string {
    return `
      <h3>Werkelijke temperatuur</h3>
      <p>De werkelijke temperatuur is de temperatuur zoals gemeten inhet weerstation</p>
      <h3>Gevoelstemperatuur</h3>
      <p>De gevoelstemperatuur wordt berekend door ....</p>
      <h3>Dauwpunt</h3>
      <p>Het dauwpunt wordt berekend door ....</p>
    `
  }

}
