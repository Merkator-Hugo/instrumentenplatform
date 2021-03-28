import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { LoadingService } from '../../services/services';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {

  public color: ThemePalette = 'primary';
  public mode: ProgressBarMode = 'determinate';
  public value: number = 100;
  public bufferValue: number = 0;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.color = this.loadingService.getColor();
    this.mode = this.loadingService.getMode();
    this.value = this.loadingService.getValue();
    this.bufferValue = this.loadingService.getBufferValue();
    this.loadingService.statusChanged.subscribe((loading) => {
      if (loading) {
        this.mode = 'indeterminate';
      } else {
        this.mode = 'determinate';        
      }
    });
  }


}
