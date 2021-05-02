import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  @Input() height: number;
  @Input() type: string;
  public style: string;

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.style = 'height:' + this.height + 'px;width:' + this.height + 'px';
    this.dashboard.widgetdataChanged.subscribe((data) => {
      if (this.type === undefined) { return; }
      let values = data.filter((d) => d.type == this.type)[0].values;
    });
  }

}