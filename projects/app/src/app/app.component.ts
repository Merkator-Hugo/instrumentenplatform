import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SettingsService, StateService, TimeService } from './services/services';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material/icon';
import { IconType } from './models/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = '';
  demo: boolean = false;
  speed: number;
  icons: { clock: string; menu: string; } = { clock: 'fa-clock', menu: 'fa-bars'};

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private matIconRegistry: MatIconRegistry,
    public state: StateService,
    private translate: TranslateService,
    public settings: SettingsService,
    private time: TimeService) {
      this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
    }

  ngOnInit() {
    this.translate.setDefaultLang('nl');
    this.state.changed.subscribe((data) => {
      this.title = data.title;
      this.translate.use(data.language);
      this.speed = data.speed;
    })
  }

  close() {
    this.sidenav.close();
  }

  setDemo(e) {
    this.demo = e.checked;
    this.state.setDemo(this.demo);
    // if (!this.demo) {
      this.time.resetTime();
    // }
    this.sidenav.close();
  }

  setSpeed(speed) {
    this.state.setSpeed(speed);
  }

}
