import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: '<div class="lds-css"><div class="lds-gear" style="height:100%"><div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
