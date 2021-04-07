import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ChartInfo } from '../../../models/interfaces';

@Component({
  selector: 'app-small-widget',
  templateUrl: './small-widget.component.html',
  styleUrls: ['./small-widget.component.scss']
})
export class SmallWidgetComponent implements OnInit {

  @Input() icon: string;
  @Input() items: { label: string; tooltip: string; value: string}[];
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
      this.registerIcons();
    }

  ngOnInit(): void {}

  private registerIcons() {
    this.matIconRegistry.addSvgIcon('temperature0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-thermometer_0.svg'));
    this.matIconRegistry.addSvgIcon('temperature1', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-thermometer_1.svg'));
    this.matIconRegistry.addSvgIcon('temperature2', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-thermometer_2.svg'));
    this.matIconRegistry.addSvgIcon('temperature3', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-thermometer_3.svg'));
  }


}