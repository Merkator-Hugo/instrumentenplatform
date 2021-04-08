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
import { Dashboard2Component } from './pages/dashboard2/dashboard2.component';
import { Dashboard3Component } from './pages/dashboard3/dashboard3.component';
import { ItemlistComponent } from './components/itemlist/itemlist.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { ChartDialogComponent } from './components/chart-dialog/chart-dialog.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { HeatmapChartComponent } from './components/heatmap-chart/heatmap-chart.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { AnalogClockComponent } from './components/analog-clock/analog-clock.component';
import { ActionsComponent } from './components/actions/actions.component';
import { ItemListNewComponent } from './components/item-list-new/item-list-new.component';
import { GraphQLModule } from './graphql.module';

import { TimeWidgetComponent } from './widgets/v1/time-widget/time-widget.component';
import { TemperatureWidgetComponent } from './widgets/v1/temperature-widget/temperature-widget.component';
import { MoonWidgetComponent } from './widgets/v1/moon-widget/moon-widget.component';
import { WidgetComponent } from './widgets/v1/widget/widget.component';
import { AirWidgetComponent } from './widgets/v1/air-widget/air-widget.component';
import { WindWidgetComponent } from './widgets/v1/wind-widget/wind-widget.component';
import { PrecipitationWidgetComponent } from './widgets/v1/precipitation-widget/precipitation-widget.component';
import { CameraWidgetComponent } from './widgets/v1/camera/camera-widget.component';
import { SunWidgetComponent } from './widgets/v1/sun/sun-widget.component';
import { ForecastWidgetComponent } from './widgets/v1/forecast/forecast-widget.component';
import { V2WidgetComponent } from './widgets/v2/widget/v2-widget.component';
import { V2TimeWidgetComponent } from './widgets/v2/time-widget/v2-time-widget.component';
import { V3ThermometerComponent } from './components/v3/thermometer/v3-thermometer.component';
import { V3AnalogClockComponent } from './components/v3/analog-clock/v3-analog-clock.component';
import { V3ItemListComponent } from './components/v3/item-list/v3-item-list.component';
import { V3ActionsComponent } from './components/v3/actions/v3-actions.component';
import { V3WidgetComponent } from './pages/dashboard3/widget/v3-widget.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    Dashboard2Component,
    Dashboard3Component,
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
    V2WidgetComponent,
    V2TimeWidgetComponent,
    ItemListNewComponent,
    V3ThermometerComponent,
    V3AnalogClockComponent,
    V3ItemListComponent,
    V3ActionsComponent,
    V3WidgetComponent,
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
    GraphQLModule,
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
