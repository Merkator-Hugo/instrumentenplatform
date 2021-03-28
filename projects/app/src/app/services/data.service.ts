import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { MockdataService } from './mockdata.service';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { TemperatureChartData, TemperatureData, WeatherData } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private stateData: any;
  currentDataChanged: EventEmitter<WeatherData> = new EventEmitter();

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

  refreshCurrentData(now: Date) {
    let wd: WeatherData;
    if(this.stateData.demo) {
      if (this.mockdata.ready) {
        wd = this.mockdata.getCurrentData(now);
        let x = 1;
      } else { 
        wd = new WeatherData();
      }
    } else {
      wd = new WeatherData();
    }
    this.currentDataChanged.emit(wd);
  }

  getTemperature(fromDate: Date, toDate: Date): Observable<TemperatureData[]> {
    if(this.stateData.demo) {
      if (this.mockdata.ready) {
        return this.mockdata.getTemperature(fromDate, toDate).pipe(
          map((t) => t)
        )
      } else {
        return from([]);
      }
    } else {
      return from([]);
    }
  }


}
