import { Component, OnInit } from '@angular/core';
import { SunData } from 'projects/app/src/app/models/classes';
import { AstronomyService } from 'projects/app/src/app/services/astronomy.service';

@Component({
  selector: 'app-more-sun',
  templateUrl: './more-sun.component.html',
  styleUrls: ['./more-sun.component.scss']
})
export class MoreSunComponent implements OnInit {

  public sun: any;

  constructor(private astronomyService: AstronomyService) { }

  ngOnInit(): void {
    this.sun = this.astronomyService.getSunData();
  }

}
