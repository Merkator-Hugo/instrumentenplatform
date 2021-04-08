import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent, ChartDialogComponent } from '../../components';
import { DataType } from '../../../models/enums';
import { DataService, LoadingService, TimeService } from '../../../services/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartInfo } from '../../../models/interfaces';

@Component({
  selector: 'v3-actions',
  templateUrl: './v3-actions.component.html',
  styleUrls: ['./v3-actions.component.scss']
})
export class V3ActionsComponent implements OnInit {

  infoIcon = 'fa-info';
  chartIcon = 'fa-chart-area';
  moreIcon = 'fa-ellipsis-h';

  NODATA = 'Geen data beschikbaar';
  ERROR = 'Fout bij ophalen data';

  @Input() more: boolean;
  @Input() info: string;
  @Input() chartsInfo: ChartInfo[];
  @Input() now: Date;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  openMoreDialog() {
    this.dialog.open(InfoDialogComponent, {
      data: {
        content: ''
      }
    });
  }

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
        data: this.chartsInfo
      }
    );
  }

}
