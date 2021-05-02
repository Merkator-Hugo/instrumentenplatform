import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-service';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.scss']
})
export class ThermometerComponent implements OnInit {

  @Input() height: number;
  @Input() type: string;
  public thread: Element;
  public style: string;

  constructor(private dashboard: DashboardService) { }

  ngOnInit(): void {
    this.style = 'height:' + this.height + 'px;width:' + this.height + 'px';
    this.thread = document.getElementById('thread');
    this.dashboard.widgetdataChanged.subscribe((data) => {
      if (this.type === undefined) { return; }
      let value = data.filter((d) => d.type == this.type)[0].values[0];
      this.redraw(value);
    });
  }

  redraw(value: any) {
    if (this.thread === undefined) { return; }
    let y = 15.6 - ( value * (1.8 / 5));
    this.thread.setAttribute('y', y.toString());
    this.thread.setAttribute('height', (24.2 - y).toString());
  }

}
