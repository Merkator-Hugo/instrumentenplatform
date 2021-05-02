import { Component, Input, OnInit } from '@angular/core';
import { ChartInfo } from '../../../models/interfaces';
import { DashboardService } from '../dashboard-service';

@Component({
  selector: 'app-tameteo',
  templateUrl: './tameteo.component.html',
  styleUrls: ['./tameteo.component.scss']
})
export class TameteoComponent implements OnInit {

  @Input() type: string;
  @Input() info: string = '';
  @Input() more: boolean = true;
  @Input() chartsInfo: ChartInfo[] = [];

  public items: [];

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.dashboard.widgetdataChanged.subscribe((data) => {
      if (this.type === undefined) { return; }
      this.items = data.filter((d) => d.type == this.type)[0].items;
    });
  }

}