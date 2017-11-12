import {
  Component, ElementRef, EventEmitter, OnDestroy,
  OnInit, Output, ViewChild
} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') editForm: NgForm;

  editedIndex: number;
  editMode = false;
  editIngredient: Ingredient;

  subscription: Subscription;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.editItem.subscribe(
      (index: number) => {
        this.editedIndex = index;
        this.editMode = true;
        this.editIngredient = this.shoppingService.getIngredient(index);

        this.editForm.setValue({
          'name': this.editIngredient.name,
          'amount': this.editIngredient.amount
        });

      }
    );
  }

  onSubmit(form: NgForm) {
    const val = form.value;
    const newIngredient = new Ingredient(val.name, val.amount);

    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedIndex, newIngredient);
    }
    else {
      this.shoppingService.addIngredients(newIngredient);
    }
    this.editMode = false;
    form.reset();
   }

  onClear() {
    this.editForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editedIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

