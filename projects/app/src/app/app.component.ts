import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { StateService } from './barrels/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = '';
  demo: boolean = false;

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public state: StateService) {}

  ngOnInit() {
    this.state.changed.subscribe((data) => {
      this.title = data.title;
    })
  }

  close() {
    this.sidenav.close();
  }

  setDemo(e) {
    this.demo = e.checked;
    this.state.setDemo(this.demo);
  }

  onSpeedChange(e) {
    this.state.setSpeed(e);
  }

}
