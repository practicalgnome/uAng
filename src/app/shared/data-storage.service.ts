import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipesService: RecipesService,
              private authService: AuthService) { }

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
      .pipe(
        map(recipes => {
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
