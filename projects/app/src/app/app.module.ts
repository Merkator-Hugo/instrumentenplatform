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
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { MoreDialogComponent } from './components/more-dialog/more-dialog.component';
import { ChartDialogComponent } from './components/chart-dialog/chart-dialog.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { HeatmapChartComponent } from './components/heatmap-chart/heatmap-chart.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { GraphQLModule } from './graphql.module';
import { UnitsConvererModule } from 'ngx-units-converter';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TimeWidgetComponent } from './widgets/v1/time-widget/time-widget.component';
import { TemperatureWidgetComponent } from './widgets/v1/temperature-widget/temperature-widget.component';
import { MoonWidgetComponent } from './widgets/v1/moon-widget/moon-widget.component';
import { AirWidgetComponent } from './widgets/v1/air-widget/air-widget.component';
import { WindWidgetComponent } from './widgets/v1/wind-widget/wind-widget.component';
import { PrecipitationWidgetComponent } from './widgets/v1/precipitation-widget/precipitation-widget.component';
import { CameraWidgetComponent } from './widgets/v1/camera/camera-widget.component';
import { SunWidgetComponent } from './widgets/v1/sun/sun-widget.component';
import { ForecastWidgetComponent } from './widgets/v1/forecast/forecast-widget.component';

import { WidgetComponent } from './pages/dashboard/widget/widget.component';
import { ActionsComponent } from './pages/dashboard/actions/actions.component';
import { PanelTitleComponent } from './pages/dashboard/panel-title/panel-title.component';
import { TameteoComponent } from './pages/dashboard/widget-right/tameteo/tameteo.component';
import { ItemListComponent } from './pages/dashboard/widget-right/item-list/item-list.component';
import { ImageComponent } from './pages/dashboard/widget-right/image/image.component';
import { ThermometerComponent } from './pages/dashboard/widget-left/thermometer/thermometer.component';
import { AnalogClockComponent } from './pages/dashboard/widget-left/analog-clock/analog-clock.component';
import { BeaufortComponent } from './pages/dashboard/widget-left/beaufort/beaufort.component';
import { CameraComponent } from './pages/dashboard/widget-left/camera/camera.component';
import { PrecipitationComponent } from './pages/dashboard/widget-left/precipitation/precipitation.component';
import { SunComponent } from './pages/dashboard/widget-left/sun/sun.component';
import { MoonComponent } from './pages/dashboard/widget-left/moon/moon.component';
import { AirComponent } from './pages/dashboard/widget-left/air/air.component';
import { ForecastComponent } from './pages/dashboard/widget-left/forecast/forecast.component';
import { MoreCameraComponent } from './pages/dashboard/widget-more/more-camera/more-camera.component';
import { MoreMoonComponent } from './pages/dashboard/widget-more/more-moon/more-moon.component';
import { MoreSunComponent } from './pages/dashboard/widget-more/more-sun/more-sun.component';
import { MoreTimeComponent } from './pages/dashboard/widget-more/more-time/more-time.component';

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
    ItemListComponent,
    InfoDialogComponent,
    MoreDialogComponent,
    ChartDialogComponent,
    LineChartComponent,
    BarChartComponent,
    HeatmapChartComponent,
    LoadingBarComponent,
    MoonWidgetComponent,
    AirWidgetComponent,
    WindWidgetComponent,
    PrecipitationWidgetComponent,
    MoonWidgetComponent,
    CameraWidgetComponent,
    SunWidgetComponent,
    ForecastWidgetComponent,
    ThermometerComponent,
    AnalogClockComponent,
    BeaufortComponent,
    ActionsComponent,
    CameraComponent,
    ImageComponent,
    PrecipitationComponent,
    SunComponent,
    MoonComponent,
    AirComponent,
    ForecastComponent,
    PanelTitleComponent,
    TameteoComponent,
    MoreCameraComponent,
    MoreMoonComponent,
    MoreSunComponent,
    MoreTimeComponent,
  ],
  imports: [
    ScrollingModule,
    UnitsConvererModule,
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
