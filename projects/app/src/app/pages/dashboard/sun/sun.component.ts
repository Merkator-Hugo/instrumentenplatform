import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-service';

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.scss']
})
export class SunComponent implements OnInit {

  @Input() height: number;
  @Input() type: string;
  public style: string;
  private circle: Element;
  private text: Element;

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.circle = document.getElementById('circle');
    this.text = document.getElementById('text');
    this.style = 'height:' + this.height + 'px;width:' + this.height + 'px';
    this.dashboard.widgetdataChanged.subscribe((data) => {
      if (this.type === undefined) { return; }
      let values = data.filter((d) => d.type == this.type)[0].values;
    });
  }

}