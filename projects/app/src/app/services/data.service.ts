import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { MockdataService } from './mockdata.service';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { AirData, AllskyCameraData, PrecipitationData, SunData, TemperatureData, WeatherData, DataEventinfo } from '../models/classes';
import { HalleyDataService } from './halley-data.service';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private stateData: any;
  private isFetching = false;
  currentDataChanged: EventEmitter<DataEventinfo> = new EventEmitter();

  constructor(private state: StateService,
              private mockdata: MockdataService,
              private halleydata: HalleyDataService,
              private timeService: TimeService) {
    this.stateData = {
      demo: false,
      title: '',
      speed: 1,
      language: 'nl'
    };
    this.timeService.tick.subscribe((now) => {
      let wd: WeatherData;
      if (!this.isFetching) {
        this.isFetching = true;
        if(this.stateData.demo) {
          this.halleydata.dataChanged.unsubscribe();
          wd = this.mockdata.getCurrentData(now);
          this.isFetching = false;
          this.currentDataChanged.emit(new DataEventinfo('OK', wd));
        } else {
          this.halleydata.getCurrentData(now).subscribe(
            (data) => {
              if(!this.stateData.demo) {
                this.isFetching = false;
                this.currentDataChanged.emit(new DataEventinfo('OK', data));
              }
            },
            (error) => {
              if(!this.stateData.demo) {
                this.isFetching = false;
                this.currentDataChanged.emit(new DataEventinfo('ERROR', error));
              }
            }
          );
        }
      }
    });
    this.state.changed.subscribe((data) => {
      this.stateData = data;
      this.isFetching = false;
    });
  }

  getAir(fromDate: Date, toDate: Date, interval: number): Observable<AirData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getAir(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return this.halleydata.getAir(fromDate, toDate, interval).pipe(
        map((t) => {
          return t;
        })
      )
    }
  }

  getPrecipitation(fromDate: Date, toDate: Date, interval: number): Observable<PrecipitationData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getPrecipitation(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return this.halleydata.getPrecipitation(fromDate, toDate, interval).pipe(
        map((t) => {
          return t;
        })
      )
    }
  }

  getSun(fromDate: Date, toDate: Date, interval: number): Observable<SunData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getSun(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return this.halleydata.getSun(fromDate, toDate, interval).pipe(
        map((t) => {
          return t;
        })
      )
    }
  }

  getTemperature(fromDate: Date, toDate: Date, interval: number): Observable<TemperatureData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getTemperature(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return this.halleydata.getTemperature(fromDate, toDate, interval).pipe(
        map((t) => {
          return t;
        })
      )
    }
  }

}
