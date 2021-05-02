import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard-service';

@Component({
  selector: 'app-beaufort',
  templateUrl: './beaufort.component.html',
  styleUrls: ['./beaufort.component.scss']
})
export class BeaufortComponent implements OnInit {

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
      this.redraw(values);
    });
  }

  private redraw(values: number[]) {
    if (this.circle === undefined) { return; }
    if (this.text === undefined) { return; }
    this.circle.setAttribute('transform', 'rotate('+ values[0] +' 50 50)');
    this.text.innerHTML = values[1].toString();
    if (values[1] > 9) {
      this.text.setAttribute('x', '35');
      this.text.setAttribute('textLength', '30');
    } else {
      this.text.setAttribute('x', '42');
      this.text.setAttribute('textLength', '16');
    }
  }

}