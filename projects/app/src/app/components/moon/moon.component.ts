import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.scss']
})
export class MoonComponent implements OnInit {

  @Input() phase: number;
  private moonLeft: Element;
  private moonRight: Element;

  constructor() { }

  ngOnInit(): void {
    this.moonLeft = document.getElementById('moon-left');
    this.moonRight = document.getElementById('moon-right');
    this.redraw(this.phase);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'phase': {
            this.redraw(changes.phase.currentValue);
          }
        }
      }
    }
  }

  redraw(phase: number) {
    if (phase == undefined) { return; }
    const step = 200 * phase;
    let phaseScale = 1;
    let phaseTrans = 100;
    let phaseRight = 0;

    if (step <= 100) {
      phaseRight = (1 - step / 100);
    }
    this.moonRight.setAttribute('transform', 'scale(' + phaseRight + ')');
    if (step >= 100) {
      phaseScale = (1 - (step - 100) / 100);
      phaseTrans = 100 * phaseScale;
    }
    this.moonLeft.setAttribute('transform', 'translate(' + phaseTrans + ',0) scale(' + (1 - phaseScale) + ')');
  }


}
