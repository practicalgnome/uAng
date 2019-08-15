import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    [this.recipe] = this.recipesService.getRecipes()
      .filter(recipe => recipe.name === this.route.snapshot.params.id);

    this.route.params.subscribe((params) => {
      [this.recipe] = this.recipesService.getRecipes()
        .filter(recipe => recipe.name === params.id);
    });
  }

  addToShoppingList() {
    // my implement
    // this.listService.addIngredient(this.recipe.ingredients);
    this.recipesService.addIngredientsToList(this.recipe.ingredients);
  }
}
