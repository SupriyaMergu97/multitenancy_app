import { Component, Input, OnInit } from '@angular/core';

export interface PersonDetails {
  name: string;
  contact: number;
  email: number;
  address: string;
}
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'contact', 'address'];
  dataSource = [];

  @Input('users')
  set users(data) {
    this.dataSource = data;
  }

  constructor() { }

  ngOnInit() {

  }

}
