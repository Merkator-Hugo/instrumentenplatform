import { EventEmitter, Injectable } from '@angular/core';

export class StateData { 
  demo: boolean;
  speed: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private demo: boolean;
  private speed: number;
  private title: string;
  public changed: EventEmitter<StateData> = new EventEmitter();

  constructor() {
    this.demo = false;
    this.speed = 1;
    this.title = '';
  }

  setSpeed(speed: number) {
    this.speed = speed;
    this.emitChanges();
  }

  setDemo(state: boolean) {
    this.demo = state;
    this.emitChanges();
  }

  setTitle(title: string) {
    this.title = title;
    this.emitChanges();
  }

  private emitChanges() {
    this.changed.emit({ 
      demo: this.demo,
      speed: this.speed,
      title: this.title
    });
  }
}
