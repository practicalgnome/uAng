import {Component, ElementRef, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput', {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef: ElementRef;

  constructor(private listService: ShoppingListService) { }

  onAdd() {
    const itemName = this.nameInputRef.nativeElement.value;
    const  itemAmount = this.amountInputRef.nativeElement.value;
    const addedItem = [new Ingredient(itemName, itemAmount)];
    this.listService.addIngredient(addedItem);
  }
}
