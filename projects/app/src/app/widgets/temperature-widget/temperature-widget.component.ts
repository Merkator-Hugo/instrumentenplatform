import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { InfoDialogComponent } from '../../components/info-dialog/info-dialog.component';
import { ChartDialogComponent } from '../../components/chart-dialog/chart-dialog.component';
import { CardItem } from '../../models/card-item';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loading.service';
import { IconType } from '../../models/icon-type';

@Component({
  selector: 'app-temperature-widget',
  templateUrl: './temperature-widget.component.html',
  styleUrls: ['./temperature-widget.component.scss']
})
export class TemperatureWidgetComponent implements OnInit {

  icon: string;
  now: string;
  title: string;
  items: CardItem[];

  constructor(
    private matIconRegistry: MatIconRegistry,
    public dialog: MatDialog,
    private dataService: DataService,
    private loadingService: LoadingService) {
      this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
    }

  ngOnInit(): void {
    this.icon = 'fa-thermometer-half';
    this.title = 'Temperatuur',
    this.now = '- °C';
    this.items = [
        { key: 'buiten', value: '- °C'},
        { key: 'dauwpunt', value: '- °C' },
        { key: 'gevoel', value: '- °C'},
        { key: 'binnen', value: '- °C' }
    ];
    this.dataService.currentDataChanged.subscribe((currentData) => {
      this.now = currentData.temperature.temperature + ' °C';
      this.items = [
        { key: 'buiten', value: currentData.temperature.temperature + ' °C' },
        { key: 'dauwpunt', value: currentData.temperature.dewpoint + ' °C' },
        { key: 'gevoel', value: (currentData.temperature.feeling != null) ? currentData.temperature.feeling + ' °C' : '- °C'},
        { key: 'binnen', value: (currentData.temperature.inside != null) ? currentData.temperature.inside + ' °C' : '- °C'},
      ];
    });
  }

  openInfoDialog() {
    this.dialog.open(InfoDialogComponent, {
      data: {
        content: `
          <h3>Werkelijke temperatuur</h3>
          <p>De werkelijke temperatuur is de temperatuur zoals gemeten inhet weerstation</p>
          <h3>Gevoelstemperatuur</h3>
          <p>De gevoelstemperatuur wordt berekend door ....</p>
          <h3>Dauwpunt</h3>
          <p>Het dauwpunt wordt berekend door ....</p>
        `
      }
    });
  }

  openGraphDialog() {
    this.loadingService.setLoadingStatus(true);
    let from = new Date(2013,0,1);
    let to = new Date(2013,11,31);
    this.dataService.getTemperature(from, to).subscribe((ts) => {
      let s0 = [];
      let s1 = [];
      for(let t of ts) {
        const time: number = Number(t.timestamp + '000');
        const temp: number = t.temperature;
        const dauw: number = t.dewpoint;
        s0.push([time, temp]);
        s1.push([time, dauw]);
      }
      let series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
        {
          name: 'werkelijk',
          data: s0
        }
      ];
      this.loadingService.setLoadingStatus(false);
      this.dialog.open(ChartDialogComponent, 
        {
          data: {
            series: series
          }
        }
      );
    });
  }

}
