import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public demo: boolean = true;
  public speed: number = 1;
  public margin: {top: number, right: number, bottom: number, left: number} 
    = {top: 100, right: 200, bottom: 100, left: 200};

  constructor() {}

  setSpeed(speed: number) {
    this.speed = speed;
  }

  toggleDemo() {
    this.demo = !this.demo;
  }
}
