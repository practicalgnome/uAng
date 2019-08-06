import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeLink = 'Shopping List';

  onNavigation(link) {
    this.activeLink = link;
  }
}
