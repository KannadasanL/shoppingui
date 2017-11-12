import { Component } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipesService} from '../recipes/recipes.service';
import {Recipe} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';
import {RouterConfigLoader} from '@angular/router/src/router_config_loader';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataService: DataStorageService,
              private recipeService: RecipesService,
              private authService: AuthService,
              private router: Router) {}

  onSaveData() {
    this.dataService.saveData().subscribe(
      (response) => { console.log(response); },
      (error) => {console.log(error); }
    );

    this.dataService.saveShopping().subscribe(
      (response) => { console.log(response); },
      (error) => {console.log(error); }
    );
  }

  onGetData() {
/*    this.dataService.getData().subscribe(
      (recipe: Recipe[]) => {
        this.recipeService.setRecipe(recipe);
        console.log(recipe);
        },
      (error) => {console.log(error); }
    );*/
      this.dataService.getData();
      this.dataService.getShoppingList();
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/signin']);
  }

}
