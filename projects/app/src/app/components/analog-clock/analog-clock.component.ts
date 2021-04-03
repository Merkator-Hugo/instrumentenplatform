import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss']
})
export class AnalogClockComponent implements OnInit, OnChanges {

  @Input() time: Date;
  @Input() diameter: number;
  public style: string;
  private hour: Element;
  private min: Element;
  private sec: Element;

  constructor() {}

  ngOnInit(): void {
    this.hour = document.getElementById('hour');
    this.min = document.getElementById('min');
    this.sec = document.getElementById('sec');
    this.diameter = 45;
    this.style = 'height:' + this.diameter + 'px;width:' + this.diameter + 'px';
    this.redraw(this.time);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'time': {
            this.redraw(changes.time.currentValue);
          }
        }
      }
    }
  }

  private rotate(el, deg) {
    el.setAttribute('transform', 'rotate('+ deg +' 50 50)');
  }

  private redraw(d: Date) {
    if (d == undefined) { return; }
    this.rotate(this.sec, 6*d.getSeconds()); 
    this.rotate(this.min, 6*d.getMinutes());
    this.rotate(this.hour, 30*(d.getHours()%12) + d.getMinutes()/2);
  }


}