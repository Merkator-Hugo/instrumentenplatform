import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { InfoDialogComponent, ChartDialogComponent } from '../components';
import { ComponentType } from '../../models/enums';
import { DataService, LoadingService } from '../../services/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  infoIcon = 'fa-info';
  chartIcon = 'fa-chart-area';
  moreIcon = 'fa-ellipsis-h';

  NODATA = 'Geen data beschikbaar';
  ERROR = 'Fout bij ophalen data';

  @Input() info: string;
  @Input() chart: ComponentType;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private loadingService: LoadingService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {}

  openInfoDialog() {
    this.dialog.open(InfoDialogComponent, {
      data: {
        content: this.info
      }
    });
  }

  openGraphDialog() {
    this.loadingService.setLoadingStatus(true);
    let from = new Date(2013,0,1);
    let to = new Date(2013,11,31);
    switch(this.chart) {
      case ComponentType.TEMPERATURE:
            this.dataService.getTemperature(from, to).subscribe(
              (ts) => {
                let s0 = [];
                let s1 = [];
                for(let t of ts) {
                  const time: number = Number(t.datetime.getTime());
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
              },
              (error) => {
                this.loadingService.setLoadingStatus(false);
                this.snackbar.open(this.ERROR, '', {duration: 3000, panelClass: 'error'});           
              }, 
              () => {
                this.loadingService.setLoadingStatus(false);
                this.snackbar.open(this.NODATA, '', {duration: 3000, panelClass: 'warn'});           
              }
          );
          break;
      }
  }

}
