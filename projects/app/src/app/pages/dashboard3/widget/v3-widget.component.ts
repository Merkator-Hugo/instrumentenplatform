import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { DataType } from '../../../models/enums';
import { ChartInfo } from '../../../models/interfaces';

@Component({
  selector: 'v3-widget',
  templateUrl: './v3-widget.component.html',
  styleUrls: ['./v3-widget.component.scss']
})
export class V3WidgetComponent implements OnInit {

  @Input() type: DataType;
  @Input() info: string = '';
  @Input() more: boolean = true;
  @Input() chartsInfo: ChartInfo[] = [];

  constructor() {}

  ngOnInit(): void {}

}