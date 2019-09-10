import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private subscription: Subscription;

  constructor(
    private listService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<{shoppingList: { ingredients: Ingredient[] } }>) {}

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
    this.listService.startedEditing.next(index);
  }
}
