import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes: Recipe[];

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute,
              private dataService: DataStorageService) { }

  ngOnInit() {
    this.subscription =  this.recipesService.recipesUpdated.subscribe(recipes => this.recipes = recipes);
    this.recipes = this.recipesService.getRecipes();
    if (!this.recipes) {
      this.dataService.fetchData().subscribe(recipes => {
        this.recipes = recipes;
      });
    }
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
