import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { WeatherData, TemperatureData, TemperatureChartData, AirData, PrecipitationData, SunData, AllskyCameraData, MagnetometerData, MeteorData, SatelliteImageData, WeatherForcastData } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class MockdataService {

  private cameraReady: boolean = false;
  private dataReady: boolean = false;
  private rawData: any[] = [];
  private cameraData: any[] = [];

  constructor(private http: HttpClient) {
    this.loadWeatherDataFromFile();
    this.loadCameraDataFromFile();
  }

  getCurrentData(now: Date): WeatherData {
    if (this.dataReady) {
      let stamp = this.getStamp(now);
      let hour = this.getHour(now);
      let n = this.rawData.filter((d) => {
        return ((d.YYYYMMDD == stamp) && (d.HH == hour));
      });
      return n.map<WeatherData>((nn) =>
        new WeatherData().fromMockData(
          new AirData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.DD), Number(nn.FF) / 10, Number(nn.P) / 10, Number(nn.U)),
          new PrecipitationData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.RH) / 10),
          new SunData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.SQ) / 10),
          new TemperatureData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.T) / 10, Number(nn.TD) / 10)
        )
      )[0];
    } else {
      return new WeatherData();
    }
  }

  getCurrentImage(now: Date): string {
    if (this.cameraReady) {
      return this.cameraData[0].url;
    }
  }

  getAir(fromDate: Date, toDate: Date): Observable<AirData[]> {
    if (this.dataReady) {
      const obs: Observable<AirData[]> = new Observable((observer) => {
        let stampF = Number(this.getStamp(fromDate));
        let stampT = Number(this.getStamp(toDate));
        let t = this.rawData.filter((d) => {
          return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
        });
        let data = t.map<AirData>((nn) =>
          new AirData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.DD), Number(nn.FF) / 10, Number(nn.P) / 10, Number(nn.U)),
        );
        observer.next(data);
      });
      return obs;
    } else {
      return from([]);
    }
  }

  getPrecipitation(fromDate: Date, toDate: Date): Observable<PrecipitationData[]> {
    if (this.dataReady) {
      const obs: Observable<PrecipitationData[]> = new Observable((observer) => {
        let stampF = Number(this.getStamp(fromDate));
        let stampT = Number(this.getStamp(toDate));
        let t = this.rawData.filter((d) => {
          return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
        });
        let data = t.map<PrecipitationData>((nn) =>
          new PrecipitationData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.RH) / 10),
        );
        observer.next(data);
      });
      return obs;
    } else {
      return from([]);
    }
  }

  getSun(fromDate: Date, toDate: Date): Observable<SunData[]> {
    if (this.dataReady) {
      const obs: Observable<SunData[]> = new Observable((observer) => {
        let stampF = Number(this.getStamp(fromDate));
        let stampT = Number(this.getStamp(toDate));
        let t = this.rawData.filter((d) => {
          return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
        });
        let data = t.map<SunData>((nn) =>
          new SunData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.SQ) / 10),
        );
        observer.next(data);
      });
      return obs;
    } else {
      return from([]);
    }
  }

  getTemperature(fromDate: Date, toDate: Date): Observable<TemperatureData[]> {
    if (this.dataReady) {
      const obs: Observable<TemperatureData[]> = new Observable((observer) => {
        let stampF = Number(this.getStamp(fromDate));
        let stampT = Number(this.getStamp(toDate));
        let t = this.rawData.filter((d) => {
          return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
        });
        let data = t.map<TemperatureData>((nn) =>
          new TemperatureData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.T) / 10, Number(nn.TD) / 10)
        );
        observer.next(data);
      });
      return obs;
    } else {
      return from([]);
    }
  }

  private getHour(d: Date): string {
    return d.getHours().toString();
  }

  private getStamp(d: Date): string {
    let YYYY = d.getFullYear().toString();
    let MM = (d.getMonth() > 8) ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1).toString();
    let DD = (d.getDate() > 9) ? d.getDate().toString() : '0' + d.getDate().toString();
    return (YYYY + MM + DD);
  }

  private loadWeatherDataFromFile() {
    this.http.get('assets/weerdata/weerdata_Volkel_Uur_2010-2020.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let l: number = 0;
          let year = 0;
          let parts: string[] = [];
          let keys: string[] = [];
          for (const line of data.split(/[\r\n]+/)) {
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
          this.dataReady = true;
        },
        error => {
          console.log(error);
        }
      );
  }

  private loadCameraDataFromFile() {
    this.http.get('assets/camera/camera_folderdata.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let l: number = 0;
          let parts: string[] = [];
          let keys: string[] = [];
          for (const line of data.split(/[\r\n]+/)) {
            if (l > 0) {
              parts = line.split(";");
              let l = {};
              for (let p in parts) {
                l[keys[p]] = parts[p];
              }
              this.cameraData.push(l);
            } else {
              parts = line.split(";");
              for (let p in parts) {
                keys[p] = parts[p].trim();
              }
            }
            l++;
          }
          this.cameraReady = true;
        },
        error => {
          console.log(error);
        }
      );
  }




}
