import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private margins: {top: number, right: number, bottom: number, left: number};
  private location: [number, number];
  private speeds: {value: number, label: string}[];

  constructor() {
    this.margins = {top: 100, right: 200, bottom: 100, left: 200};
    this.location = [52.52, 13.41];
    this.speeds = [
      { value: 1, label: '1 sec'},
      { value: 60, label: '1 min'},
      { value: 600, label: '10 min'},
      { value: 1800, label: '30 min'},
      { value: 3600, label: '1 uur'},
    ]
  }

  getMargins(): {top: number, right: number, bottom: number, left: number} {
    return this.margins;
  }

  getLocation(): [number,number] {
    return this.location;
  }

  getSpeeds(): {value: number, label: string}[] {
    return this.speeds;
  }

}
