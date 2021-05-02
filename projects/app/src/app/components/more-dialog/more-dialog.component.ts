import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoreDialogData } from '../../models/interfaces';

@Component({
  selector: 'app-more-dialog',
  templateUrl: './more-dialog.component.html',
  styleUrls: ['./more-dialog.component.scss']
})
export class MoreDialogComponent implements OnInit {

  public content = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MoreDialogData,
    private http: HttpClient) {
    this.http.get(data.url, {responseType: 'text'})
        .subscribe((data) => {
          console.log(data);
          this.content = data;
        });
  }

  ngOnInit(): void {}

}


