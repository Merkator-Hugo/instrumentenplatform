import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { InfoDialogComponent } from '../../components/info-dialog/info-dialog.component';
import { CardData } from '../../models/card-data';
import { CardItem } from '../../models/card-item';

@Component({
  selector: 'app-temperature-widget',
  templateUrl: './temperature-widget.component.html',
  styleUrls: ['./temperature-widget.component.scss']
})
export class TemperatureWidgetComponent implements OnInit {

  @Input() data: CardData;
  items: CardItem[];

  constructor(
    private matIconRegistry: MatIconRegistry,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    const icontype = this.data.icontype || 'fas';
    this.matIconRegistry.setDefaultFontSetClass(icontype);
    this.items = this.data.items;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.data) {
      this.items = changes.data.currentValue.items;
    }
  }

  openInfoDialog() {
    this.dialog.open(InfoDialogComponent, {
      data: {
        content: `
          <h3>Werkelijke temperatuur</h3>
          <p>De werkelijke temperatuur is de temperatuur zoals gemeten inhet weerstation</p>
          <h3>Gevoelstemperatuur</h3>
          <p>De gevoelstemperatuur wordt berekend door ....</p>
          <h3>Dauwpunt</h3>
          <p>Het dauwpunt wordt berekend door ....</p>
        `
      }
    });
  }

}
