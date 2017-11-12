import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipesService: RecipesService,
              private router: Router,
              private routes: ActivatedRoute) { }

  ngOnInit() {
    this.recipesService.recipeChanged.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe;
      }
    );
     this.recipes = this.recipesService.getRecipes();
   //  this.recipes = this.recipesService.getRecipeData();
  }

  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.routes});
  }

}
