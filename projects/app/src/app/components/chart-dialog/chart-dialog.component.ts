import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartData, ChartInfo } from '../../models/interfaces';
import { DataType, TimeSpan } from '../../models/enums';
import { DataService, LoadingService, SettingsService, TimeService } from '../../services/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.scss']
})
export class ChartDialogComponent implements OnInit {

  public screen: { width: any, height: any };
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.screen = {
      width: event.target.innerWidth,
      height: event.target.innerHeight
    };
  };
  public timespans: TimeSpan[] = [];
  public selectedTimespan: TimeSpan;
  public selectedChart: ChartInfo;
  public data: ChartData = {};
  public dataLoaded: boolean = false;
  NODATA = 'Geen data beschikbaar';
  ERROR = 'Fout bij ophalen data';

  constructor(
    @Inject(MAT_DIALOG_DATA) public chartsInfo: ChartInfo[],
    private settings: SettingsService,
    public loading: LoadingService,
    private snackbar: MatSnackBar,
    private dataService: DataService,
    private time: TimeService) { }

  ngOnInit(): void {
    this.dataLoaded = false;
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
    this.selectedTimespan = TimeSpan.WEEK;
    this.selectedChart = this.chartsInfo[0];
    this.getData();
  }

  selectTimespan(timespan: TimeSpan): void {
    this.selectedTimespan = timespan;
    this.getData();
  }

  selectChart(chart: ChartInfo) {
    this.selectedChart = chart;
    this.getData();
  }

  private getData() {
    this.loading.setLoadingStatus(true);
    let to = this.time.getNow();
    let from;
    switch (this.selectedTimespan) {
      case TimeSpan.YEAR:
        from = new Date(to.getFullYear() - 1, to.getMonth(), to.getDate(), to.getHours(), to.getMinutes(), to.getSeconds());
        break;
      case TimeSpan.MONTH:
        from = new Date(to.getFullYear(), to.getMonth() - 1, to.getDate(), to.getHours(), to.getMinutes(), to.getSeconds());
        break;
      case TimeSpan.WEEK:
        from = new Date(to.getFullYear(), to.getMonth(), to.getDate() - 7, to.getHours(), to.getMinutes(), to.getSeconds());
        break;
      case TimeSpan.DAY:
      default:
        from = new Date(to.getFullYear(), to.getMonth(), to.getDate() - 1, to.getHours(), to.getMinutes(), to.getSeconds());
        break;
    }
    switch (this.selectedChart.datatype) {
      case DataType.AIR:
        this.processAir(from, to);
        break;
      case DataType.PRECIPITATION:
        this.processPrecipitation(from, to);
        break;
      case DataType.SUN:
        this.processSun(from, to);
        break;
      case DataType.TEMPERATURE:
        this.processTemperature(from, to);
        break;
      case DataType.WIND:
        this.processWind(from, to);
        break;
      }

  }

  private processAir(from: Date, to: Date) {
    this.dataService.getAir(from, to).subscribe(
      (as) => {
        if (as.length < 1) {
          this.loading.setLoadingStatus(false);
          this.snackbar.open(this.NODATA, '', { duration: 3000, panelClass: 'warn' });
        }
        let s0 = [];
        let s1 = [];
        for (let a of as) {
          const time: number = Number(a.datetime.getTime());
          const pressure: number = a.airpressure;
          const humidity: number = a.humidity;
          s0.push([time, pressure]);
          s1.push([time, humidity]);
        }
        this.data = {
          chart: {
            width: '100%', // this.screen.width - (this.settings.getMargins().left + this.settings.getMargins().right),
            height: '100%', // this.screen.height - (this.settings.getMargins().top + this.settings.getMargins().bottom),
            type: null,
          },
          yaxis: [
            {
              min: 800,
              max: 1200,
              title: {
                text: "luchtdruk (hPa)"
              },
            },
            {
              opposite: true,
              title: {
                text: "luchtvochtigheid (%)"
              }
            }
          ],
          series: [
            {
              name: 'luchtdruk',
              data: s0
            },
            {
              name: 'luchtvochtigheid',
              data: s1
            }
          ]
        };
        this.loading.setLoadingStatus(false);
        this.dataLoaded = true;
      },
      (error) => {
        this.loading.setLoadingStatus(false);
        this.snackbar.open(this.ERROR, '', { duration: 3000, panelClass: 'error' });
      },
      () => {
        this.loading.setLoadingStatus(false);
        this.snackbar.open(this.NODATA, '', { duration: 3000, panelClass: 'warn' });
      }
    );
  }

  private processPrecipitation(from: Date, to: Date) {
    this.dataService.getPrecipitation(from, to).subscribe(
      (ps) => {
        if (ps.length < 1) {
          this.loading.setLoadingStatus(false);
          this.snackbar.open(this.NODATA, '', { duration: 3000, panelClass: 'warn' });
        }
        let s0 = [];
        for (let p of ps) {
          const time: number = Number(p.datetime.getTime());
          const value: number = p.value;
          s0.push([time, value]);
        }
        this.data = {
          chart: {
            width: '100%', // this.screen.width - (this.settings.getMargins().left + this.settings.getMargins().right),
            height: '100%', // this.screen.height - (this.settings.getMargins().top + this.settings.getMargins().bottom),
            type: null,
          },
          series: [
            {
              name: 'neerslag',
              data: s0
            }
          ]
        };
        this.loading.setLoadingStatus(false);
        this.dataLoaded = true;
      },
      (error) => {
        this.loading.setLoadingStatus(false);
        this.snackbar.open(this.ERROR, '', { duration: 3000, panelClass: 'error' });
      },
      () => {
        this.loading.setLoadingStatus(false);
        this.snackbar.open(this.NODATA, '', { duration: 3000, panelClass: 'warn' });
      }
    );
  }

  private processSun(from: Date, to: Date) {
    this.dataService.getSun(from, to).subscribe(
      (ss) => {
        if (ss.length < 1) {
          this.loading.setLoadingStatus(false);
          this.snackbar.open(this.NODATA, '', { duration: 3000, panelClass: 'warn' });
        }
        let s0 = [];
        let s1 = [];
        for (let s of ss) {
          const time: number = Number(s.datetime.getTime());
          const radiation: number = s.radiation;
          const uvindex: number = s.uvindex;
          s0.push([time, radiation]);
          s1.push([time, uvindex]);
        }
        this.data = {
          chart: {
            width: '100%', // this.screen.width - (this.settings.getMargins().left + this.settings.getMargins().right),
            height: '100%', // this.screen.height - (this.settings.getMargins().top + this.settings.getMargins().bottom),
            type: null,
          },
          series: [
            {
              name: 'straling',
              data: s0
            },
            {
              name: 'uvindex',
              data: s1
            }
          ]
        };
        this.loading.setLoadingStatus(false);
        this.dataLoaded = true;
      },
      (error) => {
        this.loading.setLoadingStatus(false);
        this.snackbar.open(this.ERROR, '', { duration: 3000, panelClass: 'error' });
      },
      () => {
        this.loading.setLoadingStatus(false);
        this.snackbar.open(this.NODATA, '', { duration: 3000, panelClass: 'warn' });
      }
    );
  }

  private processTemperature(from: Date, to: Date) {
    this.dataService.getTemperature(from, to).subscribe(
      (ts) => {
        if (ts.length < 1) {
          this.loading.setLoadingStatus(false);
          this.snackbar.open(this.NODATA, '', { duration: 3000, panelClass: 'warn' });
        }
        let s0 = [];
        let s1 = [];
        let s2 = [];
        for (let t of ts) {
          const time: number = Number(t.datetime.getTime());
          const temp: number = t.temperature;
          const dauw: number = t.dewpoint;
          const binnen: number = t.inside;
          s0.push([time, temp]);
          s1.push([time, dauw]);
          s2.push([time, binnen]);
        }
        this.data = {
          chart: {
            width: '100%', // this.screen.width - (this.settings.getMargins().left + this.settings.getMargins().right),
            height: '100%', // this.screen.height - (this.settings.getMargins().top + this.settings.getMargins().bottom),
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
            },
            {
              name: 'binnen',
              data: s2
            }
          ]
        };
        this.loading.setLoadingStatus(false);
        this.dataLoaded = true;
      },
      (error) => {
        this.loading.setLoadingStatus(false);
        this.snackbar.open(this.ERROR, '', { duration: 3000, panelClass: 'error' });
      },
      () => {
        this.loading.setLoadingStatus(false);
        this.snackbar.open(this.NODATA, '', { duration: 3000, panelClass: 'warn' });
      }
    );
  }

  private processWind(from: Date, to: Date) {
    this.dataService.getAir(from, to).subscribe(
      (as) => {
        if (as.length < 1) {
          this.loading.setLoadingStatus(false);
          this.snackbar.open(this.NODATA, '', { duration: 3000, panelClass: 'warn' });
        }
        let s0 = [];
        let s1 = [];
        if (this.selectedChart.charttype == 'line') {
          for (let a of as) {
            const time: number = Number(a.datetime.getTime());
            const direction: number = a.wind_direction;
            const speed: number = a.wind_speed;
            s0.push([time, direction]);
            s1.push([time, speed]);
          }
          this.data = {
            chart: {
              width: '100%', // this.screen.width - (this.settings.getMargins().left + this.settings.getMargins().right),
              height: '100%', // this.screen.height - (this.settings.getMargins().top + this.settings.getMargins().bottom),
              type: null,
            },
            yaxis: [
              {
                title: {
                  text: "windrichting"
                },
              },
              {
                opposite: true,
                title: {
                  text: "windsnelheid"
                }
              }
            ],
            series: [
              {
                name: 'windrichting',
                data: s0
              },
              {
                name: 'windsnelheid',
                data: s1
              }
            ]
          };
        } else if (this.selectedChart.charttype == 'heatmap') {
          let sAll = [];
          for (let a of as) {
            const date: Date = a.datetime;
            const direction: number = a.wind_direction;
            const speed: number = a.wind_speed;
            if (!sAll[speed]) {
              // sAll[speed] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
              sAll[speed] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            }
            // sAll[speed][Math.floor(direction/10)] += 1;
            sAll[speed][Math.floor(direction/22.5)] += 1;
          }
          const windrichtingen = ['N','NNO', 'NO', 'ONO','O','OZO', 'ZO', 'ZZO','Z','ZZW', 'ZW', 'WZW','W','WNW', 'NW', 'NNW'];
          let series = [];
          const keys = Object.keys(sAll); // [...sAll.keys()];
          for (let key of keys) {
            let s = [];
            let row = sAll[key];
            for (let i=0; i<row.length; i++) {
              if ((!isNaN(row[i])) && (row[i] != undefined)) {
                // s.push({x: i*10, y: row[i]})
                s.push({x: windrichtingen[i], y: row[i]})
              }
            }
            series.push(
              {
                name: key.toString(),
                data: s
              }
            );
          }
          this.data = {
            chart: {
              width: '100%', // this.screen.width - (this.settings.getMargins().left + this.settings.getMargins().right),
              height: '100%', // this.screen.height - (this.settings.getMargins().top + this.settings.getMargins().bottom),
              type: null,
            },
            yaxis: [
              {
                title: {
                  text: "windsnelheid"
                },
              }
            ],
            series: series
          };
        }
        this.loading.setLoadingStatus(false);
        this.dataLoaded = true;
      },
      (error) => {
        this.loading.setLoadingStatus(false);
        this.snackbar.open(this.ERROR, '', { duration: 3000, panelClass: 'error' });
      },
      () => {
        this.loading.setLoadingStatus(false);
        this.snackbar.open(this.NODATA, '', { duration: 3000, panelClass: 'warn' });
      }
    );
  }

}
