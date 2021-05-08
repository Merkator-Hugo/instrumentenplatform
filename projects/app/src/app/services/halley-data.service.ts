import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { AirData, PrecipitationData, SunData, TemperatureData, WeatherData } from "../models/classes";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HalleyDataService {

  // private URL = 'http://10.0.10.13:4000/graphql';
  private isFetching: boolean = false;

  public dataChanged: EventEmitter<any> = new EventEmitter();

  constructor(private apollo: Apollo) {
    // this.getData(new Date(2021,3,7), new Date());
  }

  getCurrentData(toDate: Date): void {
    if (this.isFetching) { return; }
    this.isFetching = true;
    const FROM = toDate.getTime() - (10 * 60 * 1000);
    const TO = toDate.getTime();
    const QUERY = gql`
      query getData($from: Date!, $to: Date!)
        {
          airRange(from: $from, to: $to) {
            datetime
            humidity
            pressure
            windspeed
            cloudheight
            particulatematter
            winddirection
          },
          temperatureRange(from: $from, to: $to) {
            datetime
            tempvalue
            intempvalue
            feelslike
            dewpoint
          }          
        }`;
    this.apollo
      .query<any>({
        query: QUERY,
        variables: {
          from: FROM,
          to: TO,
        },
      })
      .subscribe(
        ({ data, loading }) => {
          let d = data;
          let air = data.airRange.reduce(function(prev, curr) {
            return (curr.datetime < prev.datetime ? curr : prev);
          });
          let temp = data.temperatureRange.reduce(function(prev, curr) {
            return (curr.datetime < prev.datetime ? curr : prev);
          });
          let airData = new AirData().fromHalleyData(
            new Date(air.datetime),
            air.humidity,
            air.pressure,
            air.windspeed,
            air.cloudheight,
            air.particulatematter,
            air.winddirection
          );
          let tempData = new TemperatureData().fromHalleyData(
            new Date(temp.datetime),
            temp.tempvalue,
            temp.intempvalue,
            temp.feelslike,
            temp.dewpoint
          );
          let weatherData = new WeatherData().fromHalleyData(airData, tempData);
          this.isFetching = false;
          this.dataChanged.emit(weatherData);
        }
      );
  }

  getChangedData(toDate: Date): void {
    const FROM = toDate.getTime() - (10 * 60 * 1000);
    const TO = toDate.getTime();
    const QUERY = gql`
      query getData($from: Date!, $to: Date!)
        {
          airRange(from: $from, to: $to) {
            datetime
            humidity
            pressure
            windspeed
            cloudheight
            particulatematter
            winddirection
          },
          temperatureRange(from: $from, to: $to) {
            datetime
            tempvalue
            intempvalue
            feelslike
            dewpoint
          }          
        }`;
    this.apollo
      .query<any>({
        query: QUERY,
        variables: {
          from: FROM,
          to: TO,
        },
      })
      .subscribe(
        ({ data, loading }) => {
          let d = data;
          let air = data.airRange.reduce(function(prev, curr) {
            return (curr.datetime < prev.datetime ? curr : prev);
          });
          let temp = data.temperatureRange.reduce(function(prev, curr) {
            return (curr.datetime < prev.datetime ? curr : prev);
          });
          let airData = new AirData().fromHalleyData(
            new Date(air.datetime),
            air.humidity,
            air.pressure,
            air.windspeed,
            air.cloudheight,
            air.particulatematter,
            air.winddirection
          );
          let tempData = new TemperatureData().fromHalleyData(
            new Date(temp.datetime),
            temp.tempvalue,
            temp.intempvalue,
            temp.feelslike,
            temp.dewpoint
          );
          let weatherData = new WeatherData().fromHalleyData(airData, tempData);
          this.dataChanged.emit(weatherData);
        }
      );
  }

  getTemperature(fromDate: Date, toDate: Date): Observable<TemperatureData[]> {
    const obs: Observable<TemperatureData[]> = new Observable((observer) => {
      const FROM = fromDate.getTime();
      const TO = toDate.getTime();
      const QUERY = gql`
        query getData($from: Date!, $to: Date!)
          {
            temperatureRange(from: $from, to: $to) {
              datetime
              tempvalue
              intempvalue
              feelslike
              dewpoint
            }          
          }`;
      this.apollo
        .query<any>({
          query: QUERY,
          variables: {
            from: FROM,
            to: TO,
          },
        })
        .subscribe(
          ({ data, loading }) => {
            let d = data;
            let tempRangeData: TemperatureData[] = [];
            for (let temp of data.temperatureRange) {
              const tempData = new TemperatureData().fromHalleyData(
                new Date(temp.datetime),
                temp.tempvalue,
                temp.intempvalue,
                temp.feelslike,
                temp.dewpoint
              );
              tempRangeData.push(tempData);
            }
            observer.next(tempRangeData);
        });
      });
    return obs;
  }

  getAir(fromDate: Date, toDate: Date): Observable<AirData[]> {
    const obs: Observable<AirData[]> = new Observable((observer) => {
      const FROM = fromDate.getTime();
      const TO = toDate.getTime();
      const QUERY = gql`
        query getData($from: Date!, $to: Date!)
          {
            airRange(from: $from, to: $to) {
              datetime
              humidity
              pressure
              windspeed
              cloudheight
              particulatematter
              winddirection
            }     
          }`;
      this.apollo
        .query<any>({
          query: QUERY,
          variables: {
            from: FROM,
            to: TO,
          },
        })
        .subscribe(
          ({ data, loading }) => {
            let d = data;
            let airRangeData: AirData[] = [];
            for (let air of data.airRange) {
              const airData = new AirData().fromHalleyData(
                new Date(air.datetime),
                air.humidity,
                air.pressure,
                air.windspeed,
                air.cloudheight,
                air.particulatematter,
                air.winddirection
              );
              airRangeData.push(airData);
            }
            observer.next(airRangeData);
        });
      });
    return obs;
  }

  getPrecipitation(fromDate: Date, toDate: Date): Observable<PrecipitationData[]> {
    const obs: Observable<PrecipitationData[]> = new Observable((observer) => {
      const FROM = fromDate.getTime();
      const TO = toDate.getTime();
      const QUERY = gql`
        query getData($from: Date!, $to: Date!)
          {
            precipitationRange(from: $from, to: $to) {
              datetime
              value
            }     
          }`;
      this.apollo
        .query<any>({
          query: QUERY,
          variables: {
            from: FROM,
            to: TO,
          },
        })
        .subscribe(
          ({ data, loading }) => {
            let d = data;
            let precipitationRangeData: PrecipitationData[] = [];
            for (let precipitation of data.precipitationRange) {
              const precipitationData = new PrecipitationData().fromHalleyData(
                new Date(precipitation.datetime),
                precipitation.value
              );
              precipitationRangeData.push(precipitationData);
            }
            observer.next(precipitationRangeData);
        });
      });
    return obs;
  }

  getSun(fromDate: Date, toDate: Date): Observable<SunData[]> {
    const obs: Observable<SunData[]> = new Observable((observer) => {
      const FROM = fromDate.getTime();
      const TO = toDate.getTime();
      const QUERY = gql`
        query getData($from: Date!, $to: Date!)
          {
            sunRange(from: $from, to: $to) {
              datetime
              value
            }     
          }`;
      this.apollo
        .query<any>({
          query: QUERY,
          variables: {
            from: FROM,
            to: TO,
          },
        })
        .subscribe(
          ({ data, loading }) => {
            let d = data;
            let sunRangeData: SunData[] = [];
            for (let sun of data.sunRange) {
              const sunData = new SunData().fromHalleyData(
                new Date(sun.datetime),
                sun.value
              );
              sunRangeData.push(sunData);
            }
            observer.next(sunRangeData);
        });
      });
    return obs;
  }


}