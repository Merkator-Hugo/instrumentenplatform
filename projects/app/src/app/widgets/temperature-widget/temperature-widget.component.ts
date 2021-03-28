import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem } from '../../models/interfaces';
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
  chart: ComponentType = ComponentType.TEMPERATURE;

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
      // if (currentData != null) {
        this.now = this.createTempString(currentData.temperature.temperature);
        this.items = [
          { key: 'buiten', value: this.createTempString(currentData.temperature.temperature) },
          { key: 'dauwpunt', value: this.createTempString(currentData.temperature.dewpoint) },
          { key: 'gevoel', value: this.createTempString(currentData.temperature.feeling)},
          { key: 'binnen', value: this.createTempString(currentData.temperature.inside)},
        ];
      // }
    });
  }

  private createTempString(value: number) {
    return (value != null) ? value + ' °C' : '- °C'
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

  // openGraphDialog() {
  //   this.loadingService.setLoadingStatus(true);
  //   let from = new Date(2013,0,1);
  //   let to = new Date(2013,11,31);
  //   this.dataService.getTemperature(from, to).subscribe((ts) => {
  //     let s0 = [];
  //     let s1 = [];
  //     for(let t of ts) {
  //       const time: number = Number(t.timestamp + '000');
  //       const temp: number = t.temperature;
  //       const dauw: number = t.dewpoint;
  //       s0.push([time, temp]);
  //       s1.push([time, dauw]);
  //     }
  //     let series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
  //       {
  //         name: 'werkelijk',
  //         data: s0
  //       }
  //     ];
  //     this.loadingService.setLoadingStatus(false);
  //     this.dialog.open(ChartDialogComponent, 
  //       {
  //         data: {
  //           series: series
  //         }
  //       }
  //     );
  //   });
  // }

}
