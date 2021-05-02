import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataType } from '../../models/enums';
import { MoreDialogData } from '../../models/interfaces';
import { MoreCameraComponent } from '../../pages/dashboard/widget-more/more-camera/more-camera.component';
import { MoreMoonComponent } from '../../pages/dashboard/widget-more/more-moon/more-moon.component';
import { MoreSunComponent } from '../../pages/dashboard/widget-more/more-sun/more-sun.component';
import { MoreTimeComponent } from '../../pages/dashboard/widget-more/more-time/more-time.component';

@Component({
  selector: 'app-more-dialog',
  templateUrl: './more-dialog.component.html',
  styleUrls: ['./more-dialog.component.scss']
})
export class MoreDialogComponent implements OnInit, AfterViewInit {

  @ViewChild("vcRef", {read:ViewContainerRef}) vcRef:ViewContainerRef;

  private type: DataType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MoreDialogData,
    private cfResolver: ComponentFactoryResolver,
    private http: HttpClient) {
      this.type = data.type;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    let resolver;
    switch (this.type) {
      case DataType.CAMERA:
        resolver = this.cfResolver.resolveComponentFactory(MoreCameraComponent);
        break;
      case DataType.MOON:
        resolver = this.cfResolver.resolveComponentFactory(MoreMoonComponent);
        break;
      case DataType.SUN:
        resolver = this.cfResolver.resolveComponentFactory(MoreSunComponent);
        break;
      case DataType.TIME:
        resolver = this.cfResolver.resolveComponentFactory(MoreTimeComponent);
        break;
    }
    let componentFactory =   this.vcRef.createComponent(resolver);
  }

}


