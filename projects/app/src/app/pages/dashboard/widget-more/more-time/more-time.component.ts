import { Component, OnInit } from '@angular/core';
import { DataService } from 'projects/app/src/app/services/data.service';


@Component({
  selector: 'app-more-time',
  templateUrl: './more-time.component.html',
  styleUrls: ['./more-time.component.scss']
})
export class MoreTimeComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    this.dataservice.currentDataChanged.subscribe((data) => {
      
    });
  }

}
