import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem } from '../../barrels/interfaces';
import { IconType } from '../../barrels/enums';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  @Input() icon: string = '';
  iconType: string = IconType.SOLID;
  @Input() title: string = '';
  items: CardItem[] = [];

  constructor(private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.setDefaultFontSetClass(this.iconType);
  }

  ngOnInit(): void {}

}
