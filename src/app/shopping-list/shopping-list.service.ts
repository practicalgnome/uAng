import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 7),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...ingredients];
    this.ingredientAdded.next([...this.ingredients]);
  }
}
