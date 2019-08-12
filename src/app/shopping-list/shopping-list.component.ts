import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {RecipesService} from '../recipes/recipes.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private listService: ShoppingListService, private recipesService: RecipesService) { }

  ngOnInit() {
    this.ingredients = this.listService.getIngredients();
    this.listService.ingredientAdded.subscribe(newList => this.ingredients = newList);
  }
}
