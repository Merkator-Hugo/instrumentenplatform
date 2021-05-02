import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent, ChartDialogComponent } from '../../../components/components';
import { DataType } from '../../../models/enums';
import { DataService, LoadingService, TimeService } from '../../../services/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartInfo } from '../../../models/interfaces';
import { MoreDialogComponent } from '../../../components/more-dialog/more-dialog.component';

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

  @Input() type: DataType;
  @Input() more: boolean;
  @Input() info: boolean;
  @Input() chartsInfo: ChartInfo[];
  @Input() now: Date;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  openMoreDialog() {
    this.dialog.open(MoreDialogComponent, {
      data: {
        type: this.type
      }
    });
  }

  openInfoDialog() {
    this.dialog.open(InfoDialogComponent, {
      data: {
        url: 'assets/info/' + this.type + '.html'
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
