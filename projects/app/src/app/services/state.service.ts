import { EventEmitter, Injectable } from '@angular/core';
import { Language } from '../models/enums';
import { StateData } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private demo: boolean;
  private speed: number;
  private title: string;
  private language: Language;
  public changed: EventEmitter<StateData> = new EventEmitter();

  constructor() {
    this.demo = false;
    this.speed = 1;
    this.title = '';
    this.language = Language.NL
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

  setLanguage(language: Language) {
    this.language = language;
  }

  private emitChanges() {
    this.changed.emit({ 
      demo: this.demo,
      speed: this.speed,
      title: this.title,
      language: this.language,
    });
  }
}
