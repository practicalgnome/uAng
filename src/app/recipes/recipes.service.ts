import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesUpdated = new Subject<Recipe[]>();

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

  constructor(private listService: ShoppingListService) {}

  addRecipe(recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next([...this.recipes]);
  }

  updateRecipe(recipe, index) {
    this.recipes[index] = recipe;
    this.recipesUpdated.next([...this.recipes]);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesUpdated.next([...this.recipes]);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index) {
    return this.recipes[index];
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    this.listService.addIngredient(ingredients);
  }
}
