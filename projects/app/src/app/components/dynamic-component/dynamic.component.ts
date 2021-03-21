import { Component, OnInit, Input, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Card } from '../../models/card';
import { ComponentType } from '../../models/component-type';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  @Input() card: Card;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit(): void {
    // this.viewContainerRef.clear();
    switch (this.card.type) {
      case ComponentType.WIDGET:
        const widgetComponentFactory = this.componentFactoryResolver.resolveComponentFactory(WidgetComponent);
        const componentRef = this.viewContainerRef.createComponent(widgetComponentFactory);
        componentRef.instance.data = this.card.data;
        break;
    }
  }
}
