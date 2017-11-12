import {Recipe} from './recipe.model';
import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
import {DataStorageService} from '../shared/data-storage.service';

@Injectable()
export class RecipesService {

  recipeChanged =  new Subject<Recipe[]>();



  private recipes: Recipe[] = [];
    /*[
    new Recipe('A Test Recipe',
              'This is simply a test',
              'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
              [
                new Ingredient('Milk', 3),
                new Ingredient('carrot', 5)
              ]
    ),
    new Recipe('An Another Recipe',
              'This is again simply a test',
               'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
               [
                 new Ingredient('beans', 16),
                 new Ingredient('beetroot', 15)
               ]
    )
  ];*/

  constructor(private shoppingService: ShoppingListService) {}


  getRecipes() {
    return this.recipes.slice();

  }

  setRecipe(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToSpList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredientsFromRecipe(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }


}
