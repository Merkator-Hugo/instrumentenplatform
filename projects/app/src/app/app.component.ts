import { Component } from '@angular/core';
import { MockdataService } from './services/mockdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private dataService: MockdataService) {
    this.dataService.loadData();
  }
}
