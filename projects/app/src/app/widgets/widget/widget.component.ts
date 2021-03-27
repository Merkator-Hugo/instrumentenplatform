import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { CardItem } from '../../barrels/interfaces';
import { ComponentType, IconType } from '../../barrels/enums';

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
  info: string = '';
  chart: ComponentType = ComponentType.WIDGET;

  constructor(private matIconRegistry: MatIconRegistry) {
    this.matIconRegistry.setDefaultFontSetClass(this.iconType);
  }

  ngOnInit(): void {}

}
