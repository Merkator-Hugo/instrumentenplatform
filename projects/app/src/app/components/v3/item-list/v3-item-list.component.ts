import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../../../models/interfaces';
import { Dashboard3Service } from '../../../pages/dashboard3/dashboard3-service'

@Component({
  selector: 'v3-item-list',
  templateUrl: './v3-item-list.component.html',
  styleUrls: ['./v3-item-list.component.scss']
})
export class V3ItemListComponent implements OnInit {

  @Input() type: string;
  public items: ListItem[] = [];

  constructor(private dashboard: Dashboard3Service) { }

  ngOnInit(): void {
    this.dashboard.widgetdataChanged.subscribe((data) => {
      this.items = data.filter((d) => d.type == this.type)[0].items;
    });
  }

}
