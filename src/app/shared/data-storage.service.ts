
import {Injectable} from '@angular/core';
import {Headers, Http, Response } from '@angular/http';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

import {RecipesService} from '../recipes/recipes.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Ingredient} from './ingredient.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipesService,
              private slService: ShoppingListService,
              private authService: AuthService) {}

  saveData() {
    const token = this.authService.getToken();
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://ng-shoppingui.firebaseio.com/recipe.json?auth=' + token,
      this.recipeService.getRecipes(),
      {
      headers: headers
    }
    )
      ;
  }

  getData() {

    const token = this.authService.getToken();

/*    return this.http.get('https://ng-shoppingui.firebaseio.com/recipe.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw('No data found!!');
        }
      );*/

      this.http.get('https://ng-shoppingui.firebaseio.com/recipe.json?auth=' + token)
        .map(
          (response: Response) => {
            const recipes: Recipe[] = response.json();
            for (let recipe of recipes) {
              if (!recipe['ingredients']) {
                console.log(recipe);
                recipe['ingredients'] = [];
              }
            }
            return recipes;
          }
        )
        .subscribe(
          (recipe: Recipe[]) => {
            this.recipeService.setRecipe(recipe);
          }
        );


  }


  saveShopping() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-shoppingui.firebaseio.com/shopping.json?auth=' + token,
      this.slService.getIngredients()
      );
  }

  getShoppingList() {
    const token = this.authService.getToken();
    this.http.get('https://ng-shoppingui.firebaseio.com/shopping.json?auth=' + token)
      .map(
        (response: Response) => {
          const ingredients: Ingredient[] = response.json();
          console.log(ingredients);
          return ingredients;
        }
      )
      .subscribe(
        (ingredient: Ingredient[]) => {
          this.slService.setIngredients(ingredient);
        }
      );
  }

}
