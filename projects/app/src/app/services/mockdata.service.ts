import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { WeatherData, TemperatureData, AirData, PrecipitationData, SunData, AllskyCameraData, MagnetometerData, MeteorData, SatelliteImageData, WeatherForcastData, CameraImage } from '../models/classes';

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
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      let n = this.rawData.filter((d) => {
        return (d.Date.getTime() == now.getTime());
      });
      return n.map<WeatherData>((nn) =>
        new WeatherData().fromMockData(
          new AirData().fromMockData(nn.Date, Number(nn.DD), Number(nn.FF) / 10, Number(nn.P) / 10, Number(nn.U)),
          new PrecipitationData().fromMockData(nn.Date, Number(nn.RH) / 10),
          new SunData().fromMockData(nn.Date, Number(nn.SQ) / 10),
          new TemperatureData().fromMockData(nn.Date, Number(nn.T) / 10, Number(nn.TD) / 10)
        )
      )[0];
    } else {
      return new WeatherData();
    }
  }

  getCurrentImage(now: Date): CameraImage {
    if (this.cameraReady) {
      const stampD = 20210212; // Number(this.getStamp(now));
      const stampH = (now.getHours() * 100) + now.getMinutes();
      const stampH1 = stampH - 10;
      const stampH2 = stampH + 10;
      let t = this.cameraData.filter((d) => {
        return ((Number(d.day) == stampD) && (Number(d.hour) >= stampH1) && (Number(d.hour) <= stampH2));
      });
      let t1;
      if (t.length > 1) {
        t1 = t.reduce(function(prev, curr) {
          return (Math.abs(Number(curr.hour) - stampH) < Math.abs(Number(prev.hour) - stampH) ? curr : prev);
        });
        return t1;
      } else {
        if (t.length == 1) {
          return t[0];
        } else {
          return new CameraImage();
        }
      }
    } else {
      return this.cameraData[0].url;
    }
  }

  getAir(fromDate: Date, toDate: Date): Observable<AirData[]> {
    if (this.dataReady) {
      const obs: Observable<AirData[]> = new Observable((observer) => {
        fromDate.setMinutes(0);
        fromDate.setSeconds(0);
        fromDate.setMilliseconds(0);
        toDate.setMinutes(0);
        toDate.setSeconds(0);
        toDate.setMilliseconds(0);
        let a = this.rawData.filter((d) => {
          return ((d.Date.getTime() >= fromDate.getTime()) && (d.Date.getTime() < toDate.getTime()));
        });
        let data = a.map<AirData>((nn) =>
          new AirData().fromMockData(nn.Date, Number(nn.DD), Number(nn.FF) / 10, Number(nn.P) / 10, Number(nn.U)),
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
        // let stampF = Number(this.getStamp(fromDate));
        // let stampT = Number(this.getStamp(toDate));
        // let t = this.rawData.filter((d) => {
        //   return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
        // });
        fromDate.setMinutes(0);
        fromDate.setSeconds(0);
        fromDate.setMilliseconds(0);
        toDate.setMinutes(0);
        toDate.setSeconds(0);
        toDate.setMilliseconds(0);
        let p = this.rawData.filter((d) => {
          return ((d.Date.getTime() >= fromDate.getTime()) && (d.Date.getTime() < toDate.getTime()));
        });
        let data = p.map<PrecipitationData>((nn) =>
          new PrecipitationData().fromMockData(nn.Date, Number(nn.RH) / 10),
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
        // let stampF = Number(this.getStamp(fromDate));
        // let stampT = Number(this.getStamp(toDate));
        // let t = this.rawData.filter((d) => {
        //   return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
        // });
        fromDate.setMinutes(0);
        fromDate.setSeconds(0);
        fromDate.setMilliseconds(0);
        toDate.setMinutes(0);
        toDate.setSeconds(0);
        toDate.setMilliseconds(0);
        let s = this.rawData.filter((d) => {
          return ((d.Date.getTime() >= fromDate.getTime()) && (d.Date.getTime() < toDate.getTime()));
        });
        let data = s.map<SunData>((nn) =>
          new SunData().fromMockData(nn.Date, Number(nn.SQ) / 10),
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
        // let stampF = Number(this.getStamp(fromDate));
        // let stampT = Number(this.getStamp(toDate));
        // let t = this.rawData.filter((d) => {
        //   return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
        // });
        fromDate.setMinutes(0);
        fromDate.setSeconds(0);
        fromDate.setMilliseconds(0);
        toDate.setMinutes(0);
        toDate.setSeconds(0);
        toDate.setMilliseconds(0);
        let t = this.rawData.filter((d) => {
          return ((d.Date.getTime() >= fromDate.getTime()) && (d.Date.getTime() < toDate.getTime()));
        });
        let data = t.map<TemperatureData>((nn) =>
          new TemperatureData().fromMockData(nn.Date, Number(nn.T) / 10, Number(nn.TD) / 10)
        );
        observer.next(data);
      });
      return obs;
    } else {
      return from([]);
    }
  }

  // private getHour(d: Date): string {
  //   return d.getHours().toString();
  // }

  // private getStamp(d: Date): string {
  //   let YYYY = d.getFullYear().toString();
  //   let MM = (d.getMonth() > 8) ? (d.getMonth() + 1).toString() : '0' + (d.getMonth() + 1).toString();
  //   let DD = (d.getDate() > 9) ? d.getDate().toString() : '0' + d.getDate().toString();
  //   return (YYYY + MM + DD);
  // }

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
              let x = 1;
              const year = Number(l['YYYYMMDD'].substring(0,4));
              const month = Number(l['YYYYMMDD'].substring(4,6))-1;
              const day = Number(l['YYYYMMDD'].substring(6,8));
              const hour = Number(l['HH']);
              // console.log(year.toString() + ',' + month.toString() + ',' + day.toString() + ',' + hour.toString());
              l['Date'] = new Date(year, month, day, hour, 0, 0);
              this.rawData.push(l);
            } else {
              parts = line.split(";");
              for (let p in parts) {
                keys[p] = parts[p].trim();
              }
              keys.push('Date');
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
