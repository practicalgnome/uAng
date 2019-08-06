import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() navbarClick = new EventEmitter<string>();
  constructor() { }
  collapsed = true;
  ngOnInit() {
    console.log(this.collapsed);
  }

  onNavbarClick($event) {
    this.navbarClick.emit($event.target.textContent);
  }
}
