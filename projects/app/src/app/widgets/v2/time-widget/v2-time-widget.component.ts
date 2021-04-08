import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartInfo } from '../../../models/interfaces';

@Component({
  selector: 'v2-time-widget',
  templateUrl: './v2-time-widget.component.html',
  styleUrls: ['./v2-time-widget.component.scss']
})
export class V2TimeWidgetComponent implements OnInit {

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