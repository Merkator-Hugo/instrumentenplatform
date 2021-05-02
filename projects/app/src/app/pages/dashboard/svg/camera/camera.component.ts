import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard-service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  @Input() height: number;
  @Input() type: string;
  public style: string;

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.style = 'height:' + this.height + 'px;width:' + this.height + 'px';
    // this.dashboard.widgetdataChanged.subscribe((data) => {
    //   if (this.type === undefined) { return; }
    //   let values = data.filter((d) => d.type == this.type)[0].values;
    // });
  }

}