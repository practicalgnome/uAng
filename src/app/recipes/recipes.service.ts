import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  ingToShoppingList = new EventEmitter<Ingredient[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'A test Rec',
      'Test description',
      'https://cdn.pixabay.com/photo/2017/07/16/10/43/recipe-2508859_960_720.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Salad', 3)
      ]),
    new Recipe(
      'Second',
      'second descr',
      'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg',
      [
        new Ingredient('Buns', 7),
        new Ingredient('Cheese', 4)
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
