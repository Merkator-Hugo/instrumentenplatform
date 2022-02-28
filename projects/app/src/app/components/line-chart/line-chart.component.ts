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

  constructor() { }

  ngOnInit(): void {
    const buttonsHeight = document.getElementById('chartButtons').clientHeight;
    const dialogHeight = document.getElementsByClassName('mat-dialog-container')[0].clientHeight;
    const height = dialogHeight - buttonsHeight - (2 * 37);
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
      fill: {
        type: 'solid',
      },
    };
    if(this.data.yaxis) {
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

}
