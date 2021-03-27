import { EventEmitter, Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private status: boolean = false;
  private color: ThemePalette = 'primary';
  private mode: ProgressBarMode = 'determinate';
  private value: number = 100;
  private bufferValue: number = 0;
  public statusChanged: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  isLoading(): boolean {
    return this.status;
  }
  setLoadingStatus(state: boolean): void {
    this.status = state;
    this.statusChanged.emit(this.status);
  }

  getColor(): ThemePalette {
    return this.color;
  }
  setColor(color: ThemePalette): void {
    this.color = color;
  }

  getMode(): ProgressBarMode {
    return this.mode;
  }
  setMode(mode: ProgressBarMode): void {
    this.mode = mode;
  }

  getValue(): number {
    return this.value;
  }
  setValue(value: number): void {
    this.value = value;
  }

  getBufferValue(): number {
    return this.bufferValue;
  }
  setBufferValue(bufferValue: number): void {
    this.bufferValue = bufferValue;
  }

}
