import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ListItem } from '../../../models/interfaces';
import { DashboardService } from '../dashboard-service'

@Component({
  selector: 'app-panel-title',
  templateUrl: './panel-title.component.html',
  styleUrls: ['./panel-title.component.scss']
})
export class PanelTitleComponent implements OnInit {

  @Input() type: string;
  @Input() onlyFirst: boolean;
  public items: ListItem[] = [];
  public isOpen = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private dashboard: DashboardService) {
      this.registerIcons();
  }

  ngOnInit(): void {
    this.items = [{ label: '', tooltip: '', value: '', unit: '' }];
    this.dashboard.widgetdataChanged.subscribe((data) => {
      if (this.type === undefined) { return; }
      const filtered = data.filter((d) => d.type == this.type);
      if (filtered.length > 0) {
        this.items = (filtered[0].items != null) ? filtered[0].items : [{ label: '', tooltip: '', value: '', unit: '' }];
      }
    });
  }

  private registerIcons() {
    this.matIconRegistry.addSvgIcon('time', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-time-3.svg'));
    this.matIconRegistry.addSvgIcon('temperature', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-thermometer.svg'));
    this.matIconRegistry.addSvgIcon('wind', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-strong-wind.svg'));
    this.matIconRegistry.addSvgIcon('camera', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-meteor.svg'));
    this.matIconRegistry.addSvgIcon('air', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-barometer.svg'));
    this.matIconRegistry.addSvgIcon('precipitation', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-rain.svg'));
    this.matIconRegistry.addSvgIcon('sun', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-day-sunny.svg'));
    this.matIconRegistry.addSvgIcon('moon', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-waning-crescent-2.svg'));
    this.matIconRegistry.addSvgIcon('forecast', this.sanitizer.bypassSecurityTrustResourceUrl('assets/tameteo/logo.svg'));
  }

}
