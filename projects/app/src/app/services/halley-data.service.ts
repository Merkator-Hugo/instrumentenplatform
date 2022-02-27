import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { AirData, PrecipitationData, SunData, TemperatureData, WeatherData } from "../models/classes";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { of } from "zen-observable";

@Injectable({
  providedIn: 'root'
})
export class HalleyDataService {

  public dataChanged: EventEmitter<any> = new EventEmitter();
  public loading: EventEmitter<any> = new EventEmitter();

  constructor(private apollo: Apollo) {}

  getCurrentData(toDate: Date): Observable<WeatherData> {
    this.loading.emit({state: true, result: null})
    console.log("GetCurrentData");
    const FROM = toDate.getTime() - (10 * 60 * 1000);
    const TO = toDate.getTime();
    const QUERY = gql`
      query getData($from: Date!, $to: Date!)
        {
          airRange(from: $from, to: $to) {
            datetime
            humidity
            insidehumidity
            pressure
            windspeed
            cloudheight
            particulatematter
            winddirection
          },
          temperatureRange(from: $from, to: $to) {
            datetime
            temperature
            insidetemperature
            feelslike
            dewpoint
          },
          rainRange(from: $from, to: $to) {
            datetime
            rate
          },         
          sunRange(from: $from, to: $to) {
            datetime
            radiation
            uvindex
          }          
        }`;
    return this.apollo
      .query<any>({
        query: QUERY,
        variables: {
          from: FROM,
          to: TO,
        },
        errorPolicy: 'all'
      })
      .pipe(
        map(
          (result) => {
            let data = result.data;
            let airData = new AirData();
            if ((data.airRange !== null) && (data.airRange.length > 0)) {
              let air = data.airRange.reduce(function(prev, curr) {
                return (curr.datetime < prev.datetime ? curr : prev);
              });
              airData = new AirData().fromHalleyData(
                new Date(air.datetime),
                air.humidity,
                air.pressure,
                air.windspeed,
                air.cloudheight,
                air.particulatematter,
                air.winddirection
              );
            }
            let tempData = new TemperatureData();
            if ((data.tempRange !== null) && (data.temperatureRange.length > 0)) {
              let temp = data.temperatureRange.reduce(function(prev, curr) {
                return (curr.datetime < prev.datetime ? curr : prev);
              });
              tempData = new TemperatureData().fromHalleyData(
                new Date(temp.datetime),
                temp.temperature,
                temp.insidetemperature,
                temp.feelslike,
                temp.dewpoint
              );
            }
            let rainData = new PrecipitationData();
            if ((data.rainRange !== null) && (data.rainRange.length > 0)) {
              let rain = data.rainRange.reduce(function(prev, curr) {
                return (curr.datetime < prev.datetime ? curr : prev);
              });
              rainData = new PrecipitationData().fromHalleyData(
                new Date(rain.datetime),
                rain.rate
              );
            }
            let sunData = new SunData();
            if ((data.sunRange !== null) && (data.sunRange.length > 0)) {
              let sun = data.sunRange.reduce(function(prev, curr) {
                return (curr.datetime < prev.datetime ? curr : prev);
              });
              sunData = new SunData().fromHalleyData(
                new Date(sun.datetime),
                sun.radiation,
                sun.uvindex
              );
            }
            return new WeatherData().fromHalleyData(airData, tempData, rainData, sunData);
          }
        ),
        catchError(err => {
          if (err.graphQLErrors.length > 0) {      
            return throwError('GraphQL errors');
            // err.graphQLErrors.forEach(e => {

            // });    
          } else if (!err.networkError.ok) {
            return throwError('No connection');
          } else {
            return throwError('Unknown error');
          }
        })
      );
  }

  // getChangedData(toDate: Date): void {
  //   console.log("GetChangedData");
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
  //           temperature
  //           insidetemperature
  //           feelslike
  //           dewpoint
  //         }          
  //       }`;
  //   this.apollo
  //     .query<any>({
  //       query: QUERY,
  //       variables: {
  //         from: FROM,
  //         to: TO,
  //       },
  //     })
  //     .subscribe(
  //       ({ data, loading }) => {
  //         let d = data;
  //         let air = data.airRange.reduce(function(prev, curr) {
  //           return (curr.datetime < prev.datetime ? curr : prev);
  //         });
  //         let temp = data.temperatureRange.reduce(function(prev, curr) {
  //           return (curr.datetime < prev.datetime ? curr : prev);
  //         });
  //         let airData = new AirData().fromHalleyData(
  //           new Date(air.datetime),
  //           air.humidity,
  //           air.pressure,
  //           air.windspeed,
  //           air.cloudheight,
  //           air.particulatematter,
  //           air.winddirection
  //         );
  //         let tempData = new TemperatureData().fromHalleyData(
  //           new Date(temp.datetime),
  //           temp.temperature,
  //           temp.insidetemperature,
  //           temp.feelslike,
  //           temp.dewpoint
  //         );
  //         let weatherData = new WeatherData().fromHalleyData(airData, tempData);
  //         this.dataChanged.emit(weatherData);
  //       },
  //       (error) => {
  //         console.log("No data connection", error);
  //       }
  //     );
  // }

  getTemperature(fromDate: Date, toDate: Date, interval: number): Observable<TemperatureData[]> {
    const obs: Observable<TemperatureData[]> = new Observable((observer) => {
      const FROM = fromDate.getTime();
      const TO = toDate.getTime();
      const INTERVAL = interval;
      const QUERY = gql`
        query getData($from: Date!, $to: Date!, $interval: Int)
          {
            temperatureRangeInterval(from: $from, to: $to, interval: $interval) {
              datetime
              temperature
              insidetemperature
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
            interval: INTERVAL
          },
        })
        .subscribe(
          ({ data, loading }) => {
            let d = data;
            let tempRangeData: TemperatureData[] = [];
            for (let temp of data.temperatureRangeInterval) {
              const tempData = new TemperatureData().fromHalleyData(
                new Date(temp.datetime),
                temp.temperature,
                temp.insidetemperature,
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

  getAir(fromDate: Date, toDate: Date, interval: number): Observable<AirData[]> {
    const obs: Observable<AirData[]> = new Observable((observer) => {
      const FROM = fromDate.getTime();
      const TO = toDate.getTime();
      const INTERVAL = interval;
      const QUERY = gql`
        query getData($from: Date!, $to: Date!, $interval: Int)
          {
            airRangeInterval(from: $from, to: $to, interval: $interval) {
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
            interval: INTERVAL
          },
        })
        .subscribe(
          ({ data, loading }) => {
            let d = data;
            let airRangeData: AirData[] = [];
            for (let air of data.airRangeInterval) {
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

  getPrecipitation(fromDate: Date, toDate: Date, interval: number): Observable<PrecipitationData[]> {
    const obs: Observable<PrecipitationData[]> = new Observable((observer) => {
      const FROM = fromDate.getTime();
      const TO = toDate.getTime();
      const INTERVAL = interval;
      const QUERY = gql`
        query getData($from: Date!, $to: Date!, $interval: Int)
          {
            rainRangeInterval(from: $from, to: $to, interval: $interval) {
              datetime
              rate
            }     
          }`;
      this.apollo
        .query<any>({
          query: QUERY,
          variables: {
            from: FROM,
            to: TO,
            interval: INTERVAL
          },
        })
        .subscribe(
          ({ data, loading }) => {
            let d = data;
            let precipitationRangeData: PrecipitationData[] = [];
            for (let precipitation of data.rainRangeInterval) {
              const precipitationData = new PrecipitationData().fromHalleyData(
                new Date(precipitation.datetime),
                precipitation.rate
              );
              precipitationRangeData.push(precipitationData);
            }
            observer.next(precipitationRangeData);
        });
      });
    return obs;
  }

  getSun(fromDate: Date, toDate: Date, interval: number): Observable<SunData[]> {
    const obs: Observable<SunData[]> = new Observable((observer) => {
      const FROM = fromDate.getTime();
      const TO = toDate.getTime();
      const INTERVAL = interval;
      const QUERY = gql`
        query getData($from: Date!, $to: Date!, $interval: Int)
          {
            sunRangeInterval(from: $from, to: $to, interval: $interval) {
              datetime
              radiation
              uvindex
            }     
          }`;
      this.apollo
        .query<any>({
          query: QUERY,
          variables: {
            from: FROM,
            to: TO,
            interval: INTERVAL
          },
        })
        .subscribe(
          ({ data, loading }) => {
            let d = data;
            let sunRangeData: SunData[] = [];
            for (let sun of data.sunRangeInterval) {
              const sunData = new SunData().fromHalleyData(
                new Date(sun.datetime),
                sun.radiation,
                sun.uvindex
              );
              sunRangeData.push(sunData);
            }
            observer.next(sunRangeData);
        });
      });
    return obs;
  }


}