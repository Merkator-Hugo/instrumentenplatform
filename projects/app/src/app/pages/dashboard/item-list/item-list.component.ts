import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../../../models/interfaces';
import { DashboardService } from '../dashboard-service'

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  @Input() type: string;
  @Input() onlyFirst: boolean;
  public items: ListItem[] = [];
  public isOpen = false;

  constructor(private dashboard: DashboardService) { }

  ngOnInit(): void {
    this.dashboard.widgetdataChanged.subscribe((data) => {
      if (this.type === undefined) { return; }
      this.items = data
        .filter((d) => d.type == this.type)[0].items;
        // .splice(4)
    });
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

}
