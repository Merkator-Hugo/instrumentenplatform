import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SettingsService, StateService, TimeService, TameteoService, DataService } from './services/services';
import { TranslateService } from '@ngx-translate/core';
import { MatIconRegistry } from '@angular/material/icon';
import { IconType } from './models/enums';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = '';
  demo: boolean = false;
  speed: number;
  icons: {[k: string]: string} = { clock: 'fa-clock', menu: 'fa-bars', wifi: 'fa-smile', nowifi: 'fa-frown', loading: 'fa-cloud-download-alt'};

  public loading = true;
  public connection: { status: string, message: string} = { status: 'OK', message: '' };
  public showError = false;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    public state: StateService,
    public data: DataService,
    private translate: TranslateService,
    public settings: SettingsService,
    private time: TimeService,
    private tameteo: TameteoService) {
      this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
      this.registerIcons();
    }

  ngOnInit() {
    this.translate.setDefaultLang('nl');
    this.state.changed.subscribe((data) => {
      this.title = data.title;
      this.translate.use(data.language);
      this.speed = data.speed;
    });
    this.data.currentDataChanged.subscribe((eventinfo) => {
      this.loading = false;
      this.connection = { status: eventinfo.status, message: eventinfo.data };
    });
  }

  close() {
    this.sidenav.close();
  }

  setDemo(e) {
    this.demo = e.checked;
    this.state.setDemo(this.demo);
    this.time.resetTime();
    // this.sidenav.close();
  }

  setSpeed(speed) {
    this.state.setSpeed(speed);
  }

  toTop() {
    window.scrollTo(0, 0);
  }

  openSnackBar() {
    this.snackBar.open(
      this.connection.message,
      null,
      {
        duration: 3000,
        verticalPosition: 'top'
      });
  }

  // getWeer() {
  //   this.tameteo.getData();
  // }

  private registerIcons() {
    this.matIconRegistry.addSvgIcon('logo', this.sanitizer.bypassSecurityTrustResourceUrl('assets/logoHalley_metNaam.svg'));
    this.matIconRegistry.addSvgIcon('weer', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-day-showers.svg'));
    this.matIconRegistry.addSvgIcon('menu', this.sanitizer.bypassSecurityTrustResourceUrl('assets/fontawesome/svgs/solid/bars.svg'));
  }

}
