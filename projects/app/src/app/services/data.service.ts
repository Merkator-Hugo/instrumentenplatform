import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { MockdataService } from './mockdata.service';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { AirData, CameraImage, PrecipitationData, SunData, TemperatureChartData, TemperatureData, WeatherData } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private stateData: any;
  currentDataChanged: EventEmitter<WeatherData> = new EventEmitter();
  cameraDataChanged: EventEmitter<CameraImage> = new EventEmitter();  


  constructor(private state: StateService,
              private mockdata: MockdataService,
              private http: HttpClient) {
    this.stateData = {
      demo: false,
      title: '',
      speed: 1,
    };
    this.state.changed.subscribe((data) => {
      this.stateData = data;
    });
  }

  refreshCurrentData(now: Date): void {
    let wd: WeatherData;
    if(this.stateData.demo) {
      wd = this.mockdata.getCurrentData(now);
    } else {
      wd = new WeatherData();
    }
    this.currentDataChanged.emit(wd);
  }

  refreshCurrentImage(now: Date): void {
    let img = new CameraImage();
    if (this.stateData.demo) {
      img = this.mockdata.getCurrentImage(now);
    } else {
      img = new CameraImage();
    }
    this.cameraDataChanged.emit(img);
  }

  getAir(fromDate: Date, toDate: Date): Observable<AirData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getAir(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return from([]);
    }
  }

  getPrecipitation(fromDate: Date, toDate: Date): Observable<PrecipitationData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getPrecipitation(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return from([]);
    }
  }

  getSun(fromDate: Date, toDate: Date): Observable<SunData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getSun(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return from([]);
    }
  }

  getTemperature(fromDate: Date, toDate: Date): Observable<TemperatureData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getTemperature(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return from([]);
    }
  }

}
