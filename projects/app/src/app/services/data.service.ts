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
  private isFetching = false;
  currentDataChanged: EventEmitter<WeatherData> = new EventEmitter();
  loading: EventEmitter<{state: boolean, message: string}> = new EventEmitter();

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
      if (!this.isFetching) {
        this.isFetching = true;
        this.loading.emit({state: true, message: null});
        if(this.stateData.demo) {
          this.halleydata.dataChanged.unsubscribe();
          wd = this.mockdata.getCurrentData(now);
          this.isFetching = false;
          this.loading.emit({state: false, message: 'OK'});
          this.currentDataChanged.emit(wd);
        } else {
          this.halleydata.getCurrentData(now).subscribe(
            (data) => {
              this.currentDataChanged.emit(data);
              this.isFetching = false;
              this.loading.emit({state: false, message: 'OK'});
            },
            (error) => {
              console.log('ERROR', error);
              this.isFetching = false;
              this.loading.emit({state: false, message: 'ERROR'});
            }
          );
        }
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

  getAir(fromDate: Date, toDate: Date): Observable<AirData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getAir(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return this.halleydata.getAir(fromDate, toDate).pipe(
        map((t) => {
          return t;
        })
      )
    }
  }

  getPrecipitation(fromDate: Date, toDate: Date): Observable<PrecipitationData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getPrecipitation(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return this.halleydata.getPrecipitation(fromDate, toDate).pipe(
        map((t) => {
          return t;
        })
      )
    }
  }

  getSun(fromDate: Date, toDate: Date): Observable<SunData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getSun(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return this.halleydata.getSun(fromDate, toDate).pipe(
        map((t) => {
          return t;
        })
      )
    }
  }

  getTemperature(fromDate: Date, toDate: Date): Observable<TemperatureData[]> {
    if(this.stateData.demo) {
      return this.mockdata.getTemperature(fromDate, toDate).pipe(
        map((t) => t)
      )
    } else {
      return this.halleydata.getTemperature(fromDate, toDate).pipe(
        map((t) => {
          return t;
        })
      )
    }
  }

}
