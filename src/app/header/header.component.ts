import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  loggedIn = false;
  authSubscription: Subscription;

  constructor(
    private dataService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authSubscription = this.store.select('auth').subscribe(storeData => {
      this.loggedIn = !!storeData.user;
    });
  }

  onSave() {
    this.dataService.saveData();
  }

  onFetch() {
    this.dataService.fetchData().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
