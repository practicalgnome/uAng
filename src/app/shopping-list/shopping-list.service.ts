// import { EventEmitter, Injectable } from '@angular/core';
// import { Ingredient } from '../shared/ingredient.model';
// import { Subject } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ShoppingListService {
//   ingredientAdded = new Subject<Ingredient[]>();
//   startedEditing = new Subject<number>();
//   private ingredients: Ingredient[] = [
//     new Ingredient('apples', 5),
//     new Ingredient('tomatoes', 7),
//   ];
//
//   getIngredients() {
//     return this.ingredients.slice();
//   }
//
//   getIngredient(index: number) {
//     return this.ingredients[index];
//   }
//
//   addIngredient(ingredients: Ingredient[]) {
//     this.ingredients = [...this.ingredients, ...ingredients];
//     this.ingredientAdded.next([...this.ingredients]);
//   }
//
//   updateIngredient(ingredients: Ingredient[], index: number) {
//     this.ingredients[index] = ingredients[0];
//     this.ingredientAdded.next([...this.ingredients]);
//   }
//
//   deleteIngredient(index: number) {
//     this.ingredients.splice(index, 1);
//     console.log('...deleting item at ' + index);
//     this.ingredientAdded.next([...this.ingredients]);
//   }
// }
