import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxScrollTopModule } from 'ngx-scrolltop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TimeWidgetComponent } from './widgets/time-widget/time-widget.component';
import { TemperatureWidgetComponent } from './widgets/temperature-widget/temperature-widget.component';
import { MoonWidgetComponent } from './widgets/moon-widget/moon-widget.component';
import { WidgetComponent } from './widgets/widget/widget.component';
import { ItemlistComponent } from './components/itemlist/itemlist.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { ChartDialogComponent } from './components/chart-dialog/chart-dialog.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { HeatmapChartComponent } from './components/heatmap-chart/heatmap-chart.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { AnalogClockComponent } from './components/analog-clock/analog-clock.component';
import { ActionsComponent } from './components/actions/actions.component';
import { AirWidgetComponent } from './widgets/air-widget/air-widget.component';
import { WindWidgetComponent } from './widgets/wind-widget/wind-widget.component';
import { PrecipitationWidgetComponent } from './widgets/precipitation-widget/precipitation-widget.component';
import { CameraWidgetComponent } from './widgets/camera/camera-widget.component';
import { SunWidgetComponent } from './widgets/sun/sun-widget.component';
import { ForecastWidgetComponent } from './widgets/forecast/forecast-widget.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WidgetComponent,
    TimeWidgetComponent,
    TemperatureWidgetComponent,
    ItemlistComponent,
    InfoDialogComponent,
    ChartDialogComponent,
    LineChartComponent,
    BarChartComponent,
    HeatmapChartComponent,
    LoadingBarComponent,
    AnalogClockComponent,
    MoonWidgetComponent,
    ActionsComponent,
    AirWidgetComponent,
    WindWidgetComponent,
    PrecipitationWidgetComponent,
    MoonWidgetComponent,
    CameraWidgetComponent,
    SunWidgetComponent,
    ForecastWidgetComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    NgxScrollTopModule,
    TranslateModule.forRoot({
      defaultLanguage: 'nl',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
