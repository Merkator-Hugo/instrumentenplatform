import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartInfo } from '../../../models/interfaces';

@Component({
  selector: 'app-small-time-widget',
  templateUrl: './small-time-widget.component.html',
  styleUrls: ['./small-time-widget.component.scss']
})
export class SmallTimeWidgetComponent implements OnInit {

  @Input() items: { label: string; tooltip: string; value: string}[];
  public now: Date;
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [];

  constructor() {}

  ngOnInit(): void {
    this.now = new Date();
  }

}