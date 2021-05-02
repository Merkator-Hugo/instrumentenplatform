import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { MockdataService } from './mockdata.service';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { AirData, AllskyCameraData, PrecipitationData, SunData, TemperatureData, WeatherData } from '../models/classes';
import { HalleyDataService } from './halley-data.service';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private stateData: any;
  currentDataChanged: EventEmitter<WeatherData> = new EventEmitter();

  constructor(private state: StateService,
              private mockdata: MockdataService,
              private halleydata: HalleyDataService,
              private timeService: TimeService) {
    this.stateData = {
      demo: false,
      title: '',
      speed: 1,
    };
    this.timeService.tick.subscribe((now) => {
      let wd: WeatherData;
      if(this.stateData.demo) {
        this.halleydata.dataChanged.unsubscribe();
        wd = this.mockdata.getCurrentData(now);
        this.currentDataChanged.emit(wd);
      } else {
        this.halleydata.getCurrentData(now);
      }
    });
    this.state.changed.subscribe((data) => {
      this.stateData = data;
      if (this.stateData.demo) {
        this.halleydata.dataChanged.unsubscribe();
      } else {
        this.halleydata.dataChanged.subscribe((wd) => {
          this.currentDataChanged.emit(wd);
        });
      }
    });
  }

  // refreshCurrentData(now: Date): void {
  //   let wd: WeatherData;
  //   if(this.stateData.demo) {
  //     wd = this.mockdata.getCurrentData(now);
  //     this.currentDataChanged.emit(wd);
  //   } else {
  //     this.halleydata.getCurrentData(now).subscribe((wd) => {
  //       this.currentDataChanged.emit(wd);
  //     });
  //   }
  // }

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
