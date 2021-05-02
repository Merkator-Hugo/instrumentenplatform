import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { DataType } from '../../../models/enums';
import { ChartInfo } from '../../../models/interfaces';
import { DashboardService } from '../dashboard-service';

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
      const items = data.filter((d) => d.type == this.type)[0].items;
      this.src = ((items.url != undefined) && (items.url != '')) ? 'assets/camera/' + items.url : 'assets/HalleyAchtergrond.jpg';
    });
  }

}