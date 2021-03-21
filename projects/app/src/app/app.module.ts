import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
// import { WidgetComponent } from './components/widget/widget.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { DynamicComponent } from './components/dynamic-component/dynamic.component';

import { TemperatureWidgetComponent } from './widgets/temperature-widget/temperature-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    // WidgetComponent,
    DashboardComponent,
    TemperatureWidgetComponent,
    // DynamicComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    // DynamicComponent,
    // WidgetComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
