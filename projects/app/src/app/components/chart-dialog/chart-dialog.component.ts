import { Platform } from '@angular/cdk/platform';
import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartData, ChartTypeData } from '../../models/interfaces';
import { ComponentType, TimeSpan } from '../../models/enums';
import { DataService, LoadingService, SettingsService, TimeService } from '../../services/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss']
})
export class ChartDialogComponent implements OnInit {

  public screen: {width: any, height: any};
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
  public timespans: TimeSpan[] = [];
  public selectedTimespan: TimeSpan;
  public data: ChartData = {};
  NODATA = 'Geen data beschikbaar';
  ERROR = 'Fout bij ophalen data';

  constructor(
    @Inject(MAT_DIALOG_DATA) public chartTypeData: ChartTypeData,
    private settings: SettingsService,
    public loading: LoadingService,
    private snackbar: MatSnackBar,
    private dataService: DataService,
    private time: TimeService) { }

  ngOnInit(): void {
    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.timespans = [
      TimeSpan.DAY,
      TimeSpan.WEEK,
      TimeSpan.MONTH,
      TimeSpan.YEAR,
    ];
    this.selectedTimespan = TimeSpan.MONTH;
    // this.data.chart = {
    //   width: this.screen.width - (this.settings.getMargins().left + this.settings.getMargins().right),
    //   height: this.screen.height - (this.settings.getMargins().top + this.settings.getMargins().bottom),
    //   type: null,
    // }
    this.getData();
  }

  selectTimespan(timespan: TimeSpan): void {
    this.selectedTimespan = timespan;
    this.getData();
  }

  private getData() {
    this.loading.setLoadingStatus(true);
    let to = this.time.getNow();
    let from;
    switch(this.selectedTimespan) {
      case TimeSpan.YEAR:
        from = new Date(to.getFullYear()-1, to.getMonth(), to.getDate(), to.getHours(), to.getMinutes(), to.getSeconds());
        break;
      case TimeSpan.MONTH:
        from = new Date(to.getFullYear(), to.getMonth()-1, to.getDate(), to.getHours(), to.getMinutes(), to.getSeconds());
        break;
      case TimeSpan.WEEK:
        from = new Date(to.getFullYear(), to.getMonth(), to.getDate()-7, to.getHours(), to.getMinutes(), to.getSeconds());
        break;
      case TimeSpan.DAY:
      default:
        from = new Date(to.getFullYear(), to.getMonth(), to.getDate()-1, to.getHours(), to.getMinutes(), to.getSeconds());
        break;
    }
    switch(this.chartTypeData.component) {
      case ComponentType.TEMPERATURE:
            this.dataService.getTemperature(from, to).subscribe(
              (ts) => {
                if (ts.length < 1) {
                  this.loading.setLoadingStatus(false);
                  this.snackbar.open(this.NODATA, '', {duration: 3000, panelClass: 'warn'});
                }
                let s0 = [];
                let s1 = [];
                for(let t of ts) {
                  const time: number = Number(t.datetime.getTime());
                  const temp: number = t.temperature;
                  const dauw: number = t.dewpoint;
                  s0.push([time, temp]);
                  s1.push([time, dauw]);
                }
                this.data = {
                  chart: {
                    width: this.screen.width - (this.settings.getMargins().left + this.settings.getMargins().right),
                    height: this.screen.height - (this.settings.getMargins().top + this.settings.getMargins().bottom),
                    type: null,
                  },              
                  series: [
                    {
                      name: 'werkelijk',
                      data: s0
                    },
                    {
                      name: 'gevoel',
                      data: s1
                    }
                  ]
                };
                this.loading.setLoadingStatus(false);
              },
              (error) => {
                this.loading.setLoadingStatus(false);
                this.snackbar.open(this.ERROR, '', {duration: 3000, panelClass: 'error'});           
              }, 
              () => {
                this.loading.setLoadingStatus(false);
                this.snackbar.open(this.NODATA, '', {duration: 3000, panelClass: 'warn'});           
              }
          );
          break;
      }

  }

}
