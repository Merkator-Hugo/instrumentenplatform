import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartData } from '../../models/interfaces';
import { TimeSpan } from '../../models/enums';
import { UtilService } from '../../services/utils.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexAnnotations,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStates,
  ApexStroke,
  ApexTheme,
  ApexTooltip,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions = {
  chart: ApexChart;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  xaxis: ApexXAxis;
  title?: ApexTitleSubtitle;
  annotations?: ApexAnnotations;
  colors?: string[];
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  labels?: string[];
  legend?: ApexLegend;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  yaxis?: ApexYAxis | ApexYAxis[];
  grid?: ApexGrid;
  states?: ApexStates;
  subtitle?: ApexTitleSubtitle;
  theme?: ApexTheme;
};

export interface Grid {
  y: {
    min: number;
    max: number;
    interval: number;
  }
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @ViewChild("linechart") chart: ChartComponent;
  @Input() data: ChartData;
  @Input() selection: TimeSpan;
  public chartOptions: ChartOptions;

  constructor(private utils: UtilService) { }

  ngOnInit(): void {
    const buttonsHeight = document.getElementById('chartButtons').clientHeight;
    const dialogHeight = document.getElementsByClassName('mat-dialog-container')[0].clientHeight;
    const height = dialogHeight - buttonsHeight - (2 * 37);
    let grid: Grid = this.initGrid(this.data.series);
    this.chartOptions = {
      series: this.data.series,
      chart: {
        id: 'line-datetime',
        type: 'line',
        width: this.data.chart.width,
        height: height,
        zoom: {
          autoScaleYaxis: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      yaxis: {
        show: true,
        min: grid.y.min,
        max: grid.y.max,
        // min: function(min) { return this.utils.charts.axis.min(min,5) },
        // max: function(max) { return this.utils.charts.axis.max(max,5) },
        tickAmount: grid.y.interval
        // labels: {
        //   formatter: function(val, index) {
        //     let label = (val%5 === 0) ? val.toFixed(0) : "";
        //     return label;
        //   }
        // }
      },
      fill: {
        type: 'solid',
        // gradient: {
        //   shadeIntensity: 1,
        //   opacityFrom: 0.7,
        //   opacityTo: 0.9,
        //   stops: [0, 100],
        // },
      },
    };
    if(this.data.yaxis) {
      // if(Array.isArray(this.data.yaxis)) {
      //   this.data.yaxis.forEach((y) => {
      //     y.labels = {
      //       formatter: function(val, index) {
      //         let label = (val%3 === 0) ? val.toFixed(0) : "";
      //         return label;
      //       }
      //     }
      //   })
      // } else {
      //   this.data.yaxis.labels = {
      //     formatter: function(val, index) {
      //       let label = (val%5 === 0) ? val.toFixed(0) : "";
      //       return label;
      //     }
      //   }
      // }
      this.chartOptions.yaxis = this.data.yaxis;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'data': {
            if (this.chart != undefined) {
              this.chart.updateSeries(changes.data.currentValue.series);   
            }
          }
        }
      }
    }
  }


  toggleSerie(serie) {
    this.chart.toggleSeries(serie.name);
  };

  updateData(selection: TimeSpan) {
    switch (selection) {
      case TimeSpan.MONTH:
      default:
        this.chart.zoomX(
          new Date('28 Jan 2013').getTime(),
          new Date('27 Feb 2013').getTime(),
        );
        break;
    }
  }

  private initGrid(series): Grid {
    let maxArray = [];
    let minArray = [];
    series.forEach((serie) => {
      const minmax = this.utils.math.minmax(serie.data);
      maxArray.push(minmax.max);
      minArray.push(minmax.min);
    })
    const max = Math.max(...maxArray);
    const min = Math.min(...minArray);
    let grid = {
      y: this.utils.charts.axis(min, max, 5)
    };
    return grid;
  }

}
