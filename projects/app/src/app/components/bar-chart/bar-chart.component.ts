import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartData } from '../../models/interfaces';
import { TimeSpan } from '../../models/enums';

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
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @ViewChild("barchart") chart: ChartComponent;
  @Input() data: ChartData;
  @Input() selection: TimeSpan;
  public chartOptions: ChartOptions;

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      series: this.data.series,
      chart: {
        id: 'bar-datetime',
        type: 'bar',
        width: this.data.chart.width,
        height: this.data.chart.height,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'datetime',
        // min: new Date('01 Mar 2012').getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    };
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
