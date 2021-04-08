import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'v3-thermometer',
  templateUrl: './v3-thermometer.component.html',
  styleUrls: ['./v3-thermometer.component.scss']
})
export class V3ThermometerComponent implements OnInit {

  @Input() height: number;
  public style: string;

  constructor() { }

  ngOnInit(): void {
    this.style = 'height:' + this.height + 'px;width:' + this.height + 'px';
  }

}
