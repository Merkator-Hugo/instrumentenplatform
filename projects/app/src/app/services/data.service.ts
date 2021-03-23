import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { MockdataService } from './mockdata.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private settings: SettingsService,
              private mockdata: MockdataService,
              private http: HttpClient) {
  }

  getTime(speed?: number) {
    if(this.settings.demo) {
      let sp = (speed) ? speed : 1;
      return this.mockdata.getTime(sp);
    } else {
      return Date();
    }
  }

  getNow() {
    if(this.settings.demo) {
      if (this.mockdata.ready) {
        return this.mockdata.getNow();
      } else { 
        return null;
      }
    } else {
      return null;
    }
  }

}
