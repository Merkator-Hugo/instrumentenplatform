import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NodeWithI18n } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class MockdataService {

  private rawData;

  constructor(private http: HttpClient) {}

  getTime() {
    return new Date('01-03-2015');
  }

  load() {
    this.http.get('assets/weerdata_Volkel_Uur_2010-2020.csv', {responseType: 'text'})
      .subscribe(
          data => {
              this.rawData = data;
          },
          error => {
              console.log(error);
          }
      );
  }
}
