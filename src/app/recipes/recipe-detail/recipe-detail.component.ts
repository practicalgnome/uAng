import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  // my implement
  // constructor(private listService: ShoppingListService) { }
  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
  }

  addToShoppingList() {
    // my implement
    // this.listService.addIngredient(this.recipe.ingredients);
    this.recipesService.addIngredientsToList(this.recipe.ingredients);
  }
}
