import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

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
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { AnalogClockComponent } from './components/analog-clock/analog-clock.component';
import { ActionsComponent } from './components/actions/actions.component';

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
    LoadingBarComponent,
    AnalogClockComponent,
    MoonWidgetComponent,
    ActionsComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
