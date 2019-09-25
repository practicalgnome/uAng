import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesUpdated = new Subject<Recipe[]>();

  private recipes: Recipe[];

  constructor(
    // private listService: ShoppingListService,
    private store: Store<fromApp.AppState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesUpdated.next([...this.recipes]);
  }

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
    if (this.recipes) {
      return this.recipes.slice();
    }
  }

  getRecipe(index) {
    return this.recipes[index];
  }

  addIngredientsToList(ingredients: Ingredient[]) {
    // this.listService.addIngredient(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredient(ingredients));
  }
}
