import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  charts = {
    interval: (minIn: number, maxIn: number): number => {
      const range = Math.abs(minIn - maxIn);
      let interval = 0.1;
      if (range <= 0.5) {
        interval = 0.1;
      } else if (range <= 1) {
        interval = 0.2;
      } else if (range <= 2.5 ) {
        interval = 0.5;
      } else if (range <= 5) {
        interval = 1;
      } else if (range <= 10 ) {
        interval = 2;
      } else if (range <= 25 ) {
        interval = 5;
      } else if (range <= 50 ) {
        interval = 10;
      } else if (range <= 100 ) {
        interval = 20;
      } else if (range <= 250 ) {
        interval = 50;
      } else if (range > 500 ) {
        interval = 100;
      }
      return interval;
    },
    axis: (minIn: number, maxIn: number): { min: number, max: number, interval: number } => {
      const intervalIn = this.charts.interval(minIn, maxIn);
      const max = Math.ceil(maxIn / intervalIn) * intervalIn;
      const min = Math.floor(minIn / intervalIn) * intervalIn;
      const interval = Math.abs(min - max) / intervalIn;
      return {
        min: min,
        max: max,
        interval: interval
      }
    }
    // axis: {
    //   max: (max: number, interval: number): number => {
    //     return Math.ceil(max / interval) * interval;
    //   },
    //   min: (min: number, interval: number): number => {
    //     return Math.floor(min / interval) * interval;
    //   },
    //   tickAmount: (min: number, max: number, interval: number): number => {
    //     return (min + max) / interval;
    //   }
    // },
  };

  math = {
    minmax: (array: any): { min: number, max: number } => {
      let newArr: number[] = [];
      for (let arr of array) {
        newArr.push(arr[1]);
      }
      return {
        min: Math.min(...newArr),
        max: Math.max(...newArr)
      };
    },
    max: (array: any): number => {
      let newArr: number[] = [];
      for (let arr of array) {
        newArr.push(arr[1]);
      }
      return Math.max(...newArr);
    },
    min: (array: any): number => {
      let newArr: number[] = [];
      for (let arr of array) {
        newArr.push(arr[1]);
      }
      return Math.min(...newArr);
    },
    // max: (array: any, prop: string): number => Math.max.apply(Math, array.map(function(o) { return o[prop]; })),
    // min: (array: any, prop: string): number => Math.min.apply(Math, array.map(function(o) { return o[prop]; })),
  };

  constructor() {}

}
