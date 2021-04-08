import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem, ChartInfo } from '../../../models/interfaces';
import { DataType, IconType } from '../../../models/enums';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  @Input() icon: string = '';
  iconType: string = IconType.SOLID;
  @Input() title: string = '';
  items: CardItem[] = [];
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [
    {
      charttype: 'line',
      datatype: DataType.WIDGET,
      label: 'Lijn',
    }
  ]

  constructor(private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.setDefaultFontSetClass(this.iconType);
  }

  ngOnInit(): void {}

}
