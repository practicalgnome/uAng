import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) 'form': NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    // private listService: ShoppingListService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(data => {
      if (data.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = data.editedIngredient;
        this.editedItemIndex = data.editedIngredientIndex;
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    });

    // this.subscription =  this.listService.startedEditing
    //   .subscribe(index => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.store.select('shoppingList').subscribe(data => {
    //       this.editedItem = data.ingredients[index];
    //     });
    //     // this.editedItem = this.listService.getIngredient(index);
    //     this.form.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    //   });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const addedItem = [new Ingredient(value.name, value.amount)];
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.listService.updateIngredient(addedItem, this.editedItemIndex);
      const item = addedItem[0];
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ index: this.editedItemIndex, ingredient: item }));
    } else {
      // this.listService.addIngredient(addedItem);
      this.store.dispatch(new ShoppingListActions.AddIngredient(addedItem));
    }
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
    form.reset();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    // this.listService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
