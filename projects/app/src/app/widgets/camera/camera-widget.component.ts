import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem, ChartTypeData } from '../../models/interfaces';
import { ComponentType, IconType } from '../../models/enums';
import { DataService, LoadingService } from '../../services/services';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-camera-widget',
  templateUrl: './camera-widget.component.html',
  styleUrls: ['./camera-widget.component.scss']
})
export class CameraWidgetComponent implements OnInit {

  icon: string = 'fa-camera';
  title: string = '';
  now: string = '- °C';
  src: string = 'assets/camera/image-20210211142641.jpg';
  info: string = '';
  chartType: ChartTypeData = {
    type: 'line',
    component: ComponentType.CAMERA,
  };

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private dataService: DataService,
    private translate: TranslateService) {
      // this.matIconRegistry.setDefaultFontSetClass(IconType.SOLID);
      this.registerCameraIcons()
    }

  ngOnInit(): void {
    this.translate.get('CAMERA').subscribe((res) => {
      this.title = res.TITLE;
    })
    this.info = this.getInfo();
    this.dataService.currentDataChanged.subscribe((currentData) => {
        this.now = this.createString(currentData.temperature.temperature, '°C');
    });
  }

  private getCategorie(temp: number): number {
    if (temp < 5) {
      return 0;
    } else if (temp < 15) {
      return 1;
    } else if (temp < 25) {
      return 2;
    } else {
      return 3
    }
  }

  private createString(value: number, unit: string) {
    return (value != null) ? value + ' ' + unit : '- ' + unit
  }

  getInfo(): string {
    return `
      <h3>Werkelijke temperatuur</h3>
      <p>De werkelijke temperatuur is de temperatuur zoals gemeten inhet weerstation</p>
      <h3>Gevoelstemperatuur</h3>
      <p>De gevoelstemperatuur wordt berekend door ....</p>
      <h3>Dauwpunt</h3>
      <p>Het dauwpunt wordt berekend door ....</p>
    `
  }

  private registerCameraIcons() {
    this.matIconRegistry.addSvgIcon('camera0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-alien.svg'));
  }

}

