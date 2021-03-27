import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { MockdataService } from './mockdata.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WeatherData } from '../barrels/classes';

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
    let cd: WeatherData;
    if(this.stateData.demo) {
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
    if(this.stateData.demo) {
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
    if(this.stateData.demo) {
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
