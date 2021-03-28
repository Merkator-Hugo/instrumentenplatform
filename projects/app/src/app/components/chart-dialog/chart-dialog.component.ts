import { Platform } from '@angular/cdk/platform';
import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartData } from '../../models/interfaces';
import { TimeSpan } from '../../models/enums';
import { SettingsService } from '../../services/services';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChartData,
    private settings: SettingsService) { }

  ngOnInit(): void {
    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.timespans = [
      TimeSpan.MONTH,
      TimeSpan.YEAR,
    ];
    this.selectedTimespan = TimeSpan.MONTH;
    this.data.chart = {
      width: this.screen.width - (this.settings.getMargins().left + this.settings.getMargins().right),
      height: this.screen.height - (this.settings.getMargins().top + this.settings.getMargins().bottom),
      type: null,
    }
  }

}
