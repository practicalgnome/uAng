import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipesService: RecipesService) { }

  saveData() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://uang-27d3f.firebaseio.com/recipes.json', recipes)
      .subscribe(res => {
        console.log(res);
      });
  }

  fetchData() {
    return this.http
      .get<Recipe[]>('https://uang-27d3f.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(
          recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []};
          }
        );
      }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }
}
