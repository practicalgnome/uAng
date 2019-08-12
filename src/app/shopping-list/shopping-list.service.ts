import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientAdded = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 7),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...ingredients];
    this.ingredientAdded.emit([...this.ingredients]);
  }
}
