import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { ChartInfo } from '../../models/interfaces';
import { DataType } from '../../models/enums';
import { DataService } from '../../services/services';
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
  now: string = '-:-';
  src: string = 'assets/HalleyAchtergrond.jpg';
  info: string = '';
  more: boolean = true;
  chartsInfo: ChartInfo[] = [];

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
    this.dataService.cameraDataChanged.subscribe((img) => {
      this.src = (img.url != '') ? 'assets/camera/' + img.url : 'assets/HalleyAchtergrond.jpg';
      this.now = img.hour.substring(0,2) + ':' + img.hour.substring(2);
    })
  }

  getInfo(): string {
    return `
      <h3>Camera</h3>
      <p>....</p>
    `
  }

  private registerCameraIcons() {
    this.matIconRegistry.addSvgIcon('camera0', this.sanitizer.bypassSecurityTrustResourceUrl('assets/weather-icons/svg/wi-alien.svg'));
  }

}

