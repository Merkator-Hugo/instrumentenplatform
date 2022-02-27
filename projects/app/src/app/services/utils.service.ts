import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  charts = {
    axis: (minIn: number, maxIn: number, intervalIn: number): { min: number, max: number, interval: number } => {
      const max = Math.ceil(maxIn / intervalIn) * intervalIn;
      const min = Math.floor(minIn / intervalIn) * intervalIn;
      const interval = (Math.abs(min) + Math.abs(max)) / intervalIn;
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
