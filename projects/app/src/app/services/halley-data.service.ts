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
            if (data.airRange.length > 0) {
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
            if (data.temperatureRange.length > 0) {
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
            return new WeatherData().fromHalleyData(airData, tempData);
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

  getChangedData(toDate: Date): void {
    console.log("GetChangedData");
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
            temp.temperature,
            temp.insidetemperature,
            temp.feelslike,
            temp.dewpoint
          );
          let weatherData = new WeatherData().fromHalleyData(airData, tempData);
          this.dataChanged.emit(weatherData);
        },
        (error) => {
          console.log("No data connection", error);
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
          },
        })
        .subscribe(
          ({ data, loading }) => {
            let d = data;
            let tempRangeData: TemperatureData[] = [];
            for (let temp of data.temperatureRange) {
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