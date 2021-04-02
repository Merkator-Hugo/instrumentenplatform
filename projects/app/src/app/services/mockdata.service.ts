import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData, TemperatureData, TemperatureChartData, AirData, PrecipitationData, SunData, AllskyCameraData, MagnetometerData, MeteorData, SatelliteImageData, WeatherForcastData } from '../models/classes';

@Injectable({
  providedIn: 'root'
})
export class MockdataService {

  public ready: boolean = false;
  private rawData: any[] = [];

  constructor(private http: HttpClient) {
    this.loadFile();
  }

  getCurrentData(now: Date): WeatherData {
    let stamp = this.getStamp(now);
    let hour = this.getHour(now); 
    let n = this.rawData.filter((d) => { 
      return ((d.YYYYMMDD == stamp) && (d.HH == hour));
    });
    return n.map<WeatherData>((nn) => 
      new WeatherData().fromMockData(
        new AirData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.DD), Number(nn.FF)/10, Number(nn.P)/10, Number(nn.U)),
        new PrecipitationData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.RH)/10),
        new SunData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.SQ)/10),
        new TemperatureData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.T)/10, Number(nn.TD)/10)
      )
    )[0];
  }

  getAir(from: Date, to: Date): Observable<AirData[]> {
    const obs: Observable<AirData[]> = new Observable((observer) => {
      let stampF = Number(this.getStamp(from));
      let stampT = Number(this.getStamp(to));
      let t = this.rawData.filter((d) => { 
        return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
      });
      let data = t.map<AirData>((nn) => 
        new AirData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.DD), Number(nn.FF)/10, Number(nn.P)/10, Number(nn.U)),
      );
      observer.next(data);
    });
    return obs;
  }

  getPrecipitation(from: Date, to: Date): Observable<PrecipitationData[]> {
    const obs: Observable<PrecipitationData[]> = new Observable((observer) => {
      let stampF = Number(this.getStamp(from));
      let stampT = Number(this.getStamp(to));
      let t = this.rawData.filter((d) => { 
        return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
      });
      let data = t.map<PrecipitationData>((nn) => 
        new PrecipitationData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.RH)/10),
      );
      observer.next(data);
    });
    return obs;
  }

  getSun(from: Date, to: Date): Observable<SunData[]> {
    const obs: Observable<SunData[]> = new Observable((observer) => {
      let stampF = Number(this.getStamp(from));
      let stampT = Number(this.getStamp(to));
      let t = this.rawData.filter((d) => { 
        return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
      });
      let data = t.map<SunData>((nn) => 
        new SunData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.SQ)/10),
      );
      observer.next(data);
    });
    return obs;
  }

  getTemperature(from: Date, to: Date): Observable<TemperatureData[]> {
    const obs: Observable<TemperatureData[]> = new Observable((observer) => {
      let stampF = Number(this.getStamp(from));
      let stampT = Number(this.getStamp(to));
      let t = this.rawData.filter((d) => { 
        return ((Number(d.YYYYMMDD) >= stampF) && (Number(d.YYYYMMDD) <= stampT));
      });
      let data = t.map<TemperatureData>((nn) => 
          new TemperatureData().fromMockData(nn.YYYYMMDD, nn.HH, Number(nn.T)/10, Number(nn.TD)/10)
      );
      observer.next(data);
    });
    return obs;
  }

  private getHour(d: Date): string {
    return d.getHours().toString();
  }

  private getStamp(d: Date): string {
    let YYYY = d.getFullYear().toString();
    let MM = (d.getMonth() > 8) ? (d.getMonth()+1).toString() : '0' + (d.getMonth()+1).toString();
    let DD = (d.getDate() > 9) ? d.getDate().toString() : '0' + d.getDate().toString();
    return (YYYY + MM + DD);
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

  // return <WeatherData> {
  //   date: nn.YYYYMMDD,
  //   hour: nn.HH,
  //   airpressure: Number(nn.P),
  //   cloudcover_height: null,
  //   dewpoint: Number(nn.TD),
  //   humidity: Number(nn.U),
  //   magnetometer_x: null,
  //   magnetometer_y: null,
  //   magnetometer_z: null,
  //   magnetometer_total: null,
  //   meteor_count: null,
  //   particulatematter: null,
  //   precipitation: Number(nn.RH),
  //   solar_brightness: Number(nn.Q),
  //   solar_intentsity: null,
  //   sqm: Number(nn.N),
  //   temperature: Number(nn.T),
  //   windchill: null,
  //   wind_direction: Number(nn.DD),
  //   wind_speed: Number(nn.FF),
  // }


}
