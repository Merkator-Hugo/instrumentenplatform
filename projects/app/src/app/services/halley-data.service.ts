import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { AirData, TemperatureData, WeatherData } from "../models/classes";
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

  // getCurrentData(toDate: Date): Observable<WeatherData> {
  //   const FROM = toDate.getTime() - (10 * 60 * 1000);
  //   const TO = toDate.getTime();
  //   const QUERY = gql`
  //     query getData($from: Date!, $to: Date!)
  //       {
  //         airRange(from: $from, to: $to) {
  //           datetime
  //           humidity
  //           pressure
  //           windspeed
  //           cloudheight
  //           particulatematter
  //           winddirection
  //         },
  //         temperatureRange(from: $from, to: $to) {
  //           datetime
  //           tempvalue
  //           intempvalue
  //           feelslike
  //           dewpoint
  //         }          
  //       }`;
  //   const obs: Observable<WeatherData> = new Observable((observer) => {
  //     this.apollo
  //       .query<any>({
  //         query: QUERY,
  //         variables: {
  //           from: FROM,
  //           to: TO,
  //         },
  //       })
  //       .subscribe(
  //         ({ data, loading }) => {
  //           let d = data;
  //           let air = data.airRange.reduce(function(prev, curr) {
  //             return (curr.datetime < prev.datetime ? curr : prev);
  //           });
  //           let temp = data.temperatureRange.reduce(function(prev, curr) {
  //             return (curr.datetime < prev.datetime ? curr : prev);
  //           });
  //           let airData = new AirData().fromHalleyData(
  //             new Date(air.datetime),
  //             air.humidity,
  //             air.pressure,
  //             air.windspeed,
  //             air.cloudheight,
  //             air.particulatematter,
  //             air.winddirection
  //           );
  //           let tempData = new TemperatureData().fromHalleyData(
  //             new Date(temp.datetime),
  //             temp.tempvalue,
  //             temp.intempvalue,
  //             temp.feelslike,
  //             temp.dewpoint
  //           );
  //           let weatherData = new WeatherData().fromHalleyData(airData, tempData);
  //           observer.next(weatherData);
  //           // let d = data && data.books;
  //           // this.loading = loading;
  //         }
  //       );
  //   });
  //   return obs;
  // }

}