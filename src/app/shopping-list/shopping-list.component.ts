import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';
// import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
// import { tap } from 'rxjs/operators';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private subscription: Subscription;

  constructor(
    // private listService: ShoppingListService,
    // private loggingService: LoggingService,
    private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    // this.ingredients = this.store.select('shoppingList');
    this.ingredients = this.store.select('shoppingList');
    // this.store.select('shoppingList').subscribe(data => this.ingredients = data.ingredients);
    // this.loggingService.printLog('Msg from ShopListComp');
    // this.ingredients = this.listService.getIngredients();
    // this.subscription =  this.listService.ingredientAdded.subscribe(newList => this.ingredients = newList);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.listService.startedEditing.next(index);
  }
}
