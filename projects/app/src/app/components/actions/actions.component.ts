import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { InfoDialogComponent, ChartDialogComponent } from '../components';
import { ComponentType } from '../../models/enums';
import { DataService, LoadingService, TimeService } from '../../services/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartTypeData } from '../../models/interfaces';

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
  @Input() chartType: ChartTypeData;
  @Input() now: Date;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private loadingService: LoadingService,
    private time: TimeService,
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
    this.dialog.open(ChartDialogComponent, 
      {
        data: this.chartType
      }
    );
  }

}
