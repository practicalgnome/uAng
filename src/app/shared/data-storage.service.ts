import { Injectable } from '@angular/core';
import {Recipe} from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  saveData(data: Recipe[]) {
    console.log('saving...');
  }

  fetchData() {
    console.log('fetching...');
  }
}
