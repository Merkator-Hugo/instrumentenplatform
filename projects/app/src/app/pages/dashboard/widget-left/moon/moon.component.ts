import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from '../../dashboard-service';

@Component({
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.scss']
})
export class MoonComponent implements OnInit {

  @Input() height: number;
  @Input() type: string;
  public style: string;
  public phase: string = '0';

  constructor(
    private dashboard: DashboardService,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
      this.registerMoonIcons()
    }

  ngOnInit(): void {
    this.style = 'height:' + this.height + 'px;width:' + this.height + 'px';
    this.dashboard.widgetdataChanged.subscribe((data) => {
      if (this.type === undefined) { return; }
      this.phase = data.filter((d) => d.type == this.type)[0].values[0];
    });
  }

  private registerMoonIcons() {
    this.matIconRegistry.addSvgIcon('moon0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-new.svg'));
    this.matIconRegistry.addSvgIcon('moon1', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-1.svg'));
    this.matIconRegistry.addSvgIcon('moon2', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-2.svg'));
    this.matIconRegistry.addSvgIcon('moon3', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-3.svg'));
    this.matIconRegistry.addSvgIcon('moon4', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-4.svg'));
    this.matIconRegistry.addSvgIcon('moon5', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-5.svg'));
    this.matIconRegistry.addSvgIcon('moon6', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-crescent-6.svg'));
    this.matIconRegistry.addSvgIcon('moon7', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-first-quarter-.svg'));
    this.matIconRegistry.addSvgIcon('moon8', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-1.svg'));
    this.matIconRegistry.addSvgIcon('moon9', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-2.svg'));
    this.matIconRegistry.addSvgIcon('moon10', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-3.svg'));
    this.matIconRegistry.addSvgIcon('moon11', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-4.svg'));
    this.matIconRegistry.addSvgIcon('moon12', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-5.svg'));
    this.matIconRegistry.addSvgIcon('moon13', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waxing-gibbous-6.svg'));
    this.matIconRegistry.addSvgIcon('moon14', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-full.svg'));
    this.matIconRegistry.addSvgIcon('moon15', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-1.svg'));
    this.matIconRegistry.addSvgIcon('moon16', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-2.svg'));
    this.matIconRegistry.addSvgIcon('moon17', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-3.svg'));
    this.matIconRegistry.addSvgIcon('moon18', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-4.svg'));
    this.matIconRegistry.addSvgIcon('moon19', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-5.svg'));
    this.matIconRegistry.addSvgIcon('moon20', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-gibbous-6.svg'));
    this.matIconRegistry.addSvgIcon('moon21', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-third-quarter.svg'));
    this.matIconRegistry.addSvgIcon('moon22', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-1.svg'));
    this.matIconRegistry.addSvgIcon('moon23', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-2.svg'));
    this.matIconRegistry.addSvgIcon('moon24', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-3.svg'));
    this.matIconRegistry.addSvgIcon('moon25', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-4.svg'));
    this.matIconRegistry.addSvgIcon('moon26', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-5.svg'));
    this.matIconRegistry.addSvgIcon('moon27', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-waning-crescent-6.svg'));
    this.matIconRegistry.addSvgIcon('moon28', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-moon-alt-new.svg'));
  }

}