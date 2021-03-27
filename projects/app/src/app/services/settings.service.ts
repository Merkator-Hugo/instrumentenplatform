import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private margins: {top: number, right: number, bottom: number, left: number};
  private location: [number, number];

  constructor() {
    this.margins = {top: 100, right: 200, bottom: 100, left: 200};
    this.location = [52.52, 13.41];
  }

  getMargins(): {top: number, right: number, bottom: number, left: number} {
    return this.margins;
  }

  getLocation(): [number,number] {
    return this.location;
  }

}
