import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { MockdataService } from './mockdata.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentDataChanged: EventEmitter<WeatherData> = new EventEmitter();

  constructor(private settings: SettingsService,
              private mockdata: MockdataService,
              private http: HttpClient) {
  }

  refreshCurrentData(now: Date) {
    let cd: WeatherData;
    if(this.settings.demo) {
      if (this.mockdata.ready) {
        cd = this.mockdata.getCurrentData(now);
        let x = 1;
      } else { 
        cd = null;
      }
    } else {
      cd = null;
    }
    this.currentDataChanged.emit(cd);
  }

  getCurrentData(now: Date) {
    if(this.settings.demo) {
      if (this.mockdata.ready) {
        return this.mockdata.getCurrentData(now);
      } else { 
        return null;
      }
    } else {
      return null;
    }
  }

  getTemperature(from: Date, to: Date): Observable<any> {
    if(this.settings.demo) {
      if (this.mockdata.ready) {
        return this.mockdata.getTemperature(from, to).pipe(
          map((t) => t)
        )
      } else { 
        return null;
      }
    } else {
      return null;
    }
  }


}
