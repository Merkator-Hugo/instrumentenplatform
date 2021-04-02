import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem, ChartTypeData } from '../../models/interfaces';
import { ComponentType, IconType } from '../../models/enums';
import { DataService, LoadingService } from '../../services/services';
import { TranslateService } from '@ngx-translate/core';
import { WeatherData } from '../../models/classes';

@Component({
  selector: 'app-precipitation-widget',
  templateUrl: './precipitation-widget.component.html',
  styleUrls: ['./precipitation-widget.component.scss']
})
export class PrecipitationWidgetComponent implements OnInit {

  icon: string = 'fa-umbrella';
  title: string = '';
  now: string = '- mm';;
  items: CardItem[];
  info: string = '';
  chartType: ChartTypeData = {
    type: 'bar',
    component: ComponentType.PRECIPITATION,
  };

  constructor(
    private matIconRegistry: MatIconRegistry,
    public dialog: MatDialog,
    private dataService: DataService,
    private translate: TranslateService) {
      this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
    }

  ngOnInit(): void {
    this.translate.get('PRECIPITATION').subscribe((res) => {
      this.title = res.TITLE;
    })
    this.info = this.getInfo();
    this.items = [
      { key: 'hoeveelheid', value: '- mm/u'},
    ];
    this.dataService.currentDataChanged.subscribe((currentData: WeatherData) => {
        this.now = this.createString(currentData.precipitation.value, 'mm/u');
        this.items = [
          { key: 'hoeveelheid', value: this.createString(currentData.precipitation.value, 'mm/u')},
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
