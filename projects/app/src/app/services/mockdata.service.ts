import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NodeWithI18n } from '@angular/compiler';
import * as d3 from "d3";
import { WeatherData } from '../models/weather-data';
import { TemperatureWeatherData } from '../models/temperature-weather-data';

@Injectable({
  providedIn: 'root'
})
export class MockdataService {

  public ready: boolean = false;
  private rawData: any[] = [];
  private time: number;

  constructor(private http: HttpClient) {
    let d = new Date(Date());
    d.setFullYear(2015);
    this.time = d.valueOf();
    this.loadFile();
  }

  getTime(speed: number) {
    this.time += (speed * 1000);
    return new Date(this.time);
  }

  getNow(): WeatherData {
    let d = new Date(this.time);
    let YYYY = d.getFullYear().toString();
    let MM = (d.getMonth() > 8) ? (d.getMonth()+1).toString() : '0' + (d.getMonth()+1).toString();
    let DD = (d.getDate() > 9) ? d.getDate().toString() : '0' + d.getDate().toString();
    let stamp = YYYY + MM + DD;
    let hh = (d.getHours() > 9) ? d.getHours().toString() : '0' + d.getHours().toString();
    let n = this.rawData.filter((d) => { 
      return ((d.YYYYMMDD == stamp) && (d.HH == hh));
    });
    return n.map<WeatherData>((nn) => 
      new WeatherData(
        new TemperatureWeatherData(Number(nn.T)/10, Number(nn.TD)/10)
      )
    )[0];
  }

  private loadFile() {
    this.http.get('assets/weerdata_Volkel_Uur_2010-2020.csv', {responseType: 'text'})
      .subscribe(
          data => {
            let l: number = 0;
            let year = 0;
            let parts: string[] = [];
            let keys: string[] = [];
            for (const line of data.split(/[\r\n]+/)){
              if (l > 0) {
                parts = line.split(";");
                let l = {};
                for (let p in parts) {
                  l[keys[p]] = parts[p];
                }
                this.rawData.push(l);
              } else {
                parts = line.split(";");
                for (let p in parts) {
                  keys[p] = parts[p].trim();
                }
              }
              l++;
            }
            this.ready = true;
          },
          error => {
              console.log(error);
          }
      );
  }

  private loadD3() {
    d3.dsv(";", "assets/weerdata_Volkel_Uur_2010-2020.csv", function(data) {
      for (var i = 0; i < data.length; i++) {
          console.log(data[i].Name);
          console.log(data[i].Age);
      }
  });
  }

  private load() {
    this.http.get('assets/weerdata_Volkel_Uur_2010-2020.csv', {responseType: 'text'})
      .subscribe(
          data => {
              this.rawData = Array.from(data);
          },
          error => {
              console.log(error);
          }
      );
  }
}
