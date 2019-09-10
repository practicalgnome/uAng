import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private listService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.loggingService.printLog('Msg from ShopListComp');
    this.ingredients = this.listService.getIngredients();
    this.subscription =  this.listService.ingredientAdded.subscribe(newList => this.ingredients = newList);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.listService.startedEditing.next(index);
  }
}
