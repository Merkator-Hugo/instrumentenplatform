import { Component, Input, OnInit } from '@angular/core';
import { ListItem } from '../../models/interfaces';

@Component({
  selector: 'app-item-list-new',
  templateUrl: './item-list-new.component.html',
  styleUrls: ['./item-list-new.component.scss']
})
export class ItemListNewComponent implements OnInit {

  @Input() items: ListItem[];

  constructor() { }

  ngOnInit(): void {}

}
