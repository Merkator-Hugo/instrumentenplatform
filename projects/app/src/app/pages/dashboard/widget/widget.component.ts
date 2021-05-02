import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { DataType } from '../../../models/enums';
import { ChartInfo } from '../../../models/interfaces';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  @Input() type: DataType;
  @Input() info: string = '';
  @Input() more: boolean = true;
  @Input() chartsInfo: ChartInfo[] = [];

  constructor() {}

  ngOnInit(): void {}

}