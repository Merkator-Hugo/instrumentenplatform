import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { MockdataService } from './mockdata.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rawData;

  public time: Date;

  constructor(private settings: SettingsService,
              private mockdata: MockdataService,
              private http: HttpClient) {
    if(settings.demo) {
      this.time = this.mockdata.getTime();
      this.mockdata.load();
    } else {
      this.time = this.getTime();
    }
  }

  private getTime() {
    return new Date();
  }

}
