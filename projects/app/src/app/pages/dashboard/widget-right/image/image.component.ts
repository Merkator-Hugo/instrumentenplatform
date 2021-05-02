import { Component, Input, OnInit } from '@angular/core';
import { ChartInfo } from '../../../../models/interfaces';
import { DashboardService } from '../../dashboard-service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  src: string = 'assets/HalleyAchtergrond.jpg';
  @Input() type: string;
  @Input() info: string = '';
  @Input() more: boolean = true;
  @Input() chartsInfo: ChartInfo[] = [];

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.dashboard.widgetdataChanged.subscribe((data) => {
      if (this.type === undefined) { return; }
      const item = data.filter((d) => d.type == this.type)[0];
      this.src = ((item.values[0] != undefined) && (item.values[0] != '')) ? 'assets/camera/' + item.values[0] : 'assets/HalleyAchtergrond.jpg';
    });
  }

}