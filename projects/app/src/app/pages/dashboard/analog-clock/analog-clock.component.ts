import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-service';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss']
})
export class AnalogClockComponent implements OnInit {

  @Input() prefix: string;
  @Input() height: number;
  @Input() type: string;
  public style: string;
  private hour: Element;
  private min: Element;
  private sec: Element;

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.hour = document.getElementById('hour');
    this.min = document.getElementById('min');
    this.sec = document.getElementById('sec');
    this.style = 'height:' + this.height + 'px;width:' + this.height + 'px';
    this.dashboard.widgetdataChanged.subscribe((data) => {
      if (this.type === undefined) { return; }
      let value = data.filter((d) => d.type == this.type)[0].values[0];
      this.redraw(value);
    });
  }

  private rotate(el, deg, correctie) {
    if (el != undefined) {
      const x = 50; //(deg > 180) ? (50 - correctie).toString() : (50 + correctie).toString();
      const y = 50; //(deg > 180) ? (50 - correctie).toString() : (50 + correctie).toString();
      el.setAttribute('transform', 'rotate('+ deg +' ' + x + ' ' + y + ')');
    }
  }

  private redraw(d: Date) {
    if (d === undefined) { return; }
    if (this.sec === undefined) { return; }
    if (this.min === undefined) { return; }
    if (this.hour === undefined) { return; }
    this.rotate(this.sec, 6*d.getSeconds(), 1); 
    this.rotate(this.min, 6*d.getMinutes(), 2);
    this.rotate(this.hour, 30*(d.getHours()%12) + d.getMinutes()/2, 2);
  }

}