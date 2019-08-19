import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private listService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.listService.getIngredients();
    this.subscription =  this.listService.ingredientAdded.subscribe(newList => this.ingredients = newList);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
