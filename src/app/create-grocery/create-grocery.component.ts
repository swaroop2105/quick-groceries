import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroceryViewComponent } from '../grocery-view/grocery-view.component';


@Component({
  selector: 'app-create-grocery',
  templateUrl: './create-grocery.component.html',
  styleUrls: ['./create-grocery.component.scss']
})
export class CreateGroceryComponent {
  groceryData: any = [];
  units = ['kg', 'grams', 'liters', 'piece', 'bottle', 'bundle', 'pack', 'liter'];
  expandedStates: boolean[] = []; // Track expanded state for each panel

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Fetch the grocery list data from the JSON file
    this.http.get('assets/grocery-data.json').subscribe((data: any) => {
      this.groceryData = data.categories;
      // Initialize expanded states to false (all panels closed by default)
      this.expandedStates = new Array(this.groceryData.length).fill(false);
    });
  }

  // Handle panel opening - check all items when a panel is opened
  onPanelOpened(categoryIndex: number): void {
    // Open the panel and check all items in that category
    this.groceryData[categoryIndex].items.forEach((item: { checked: boolean; }) => {
      item.checked = true;
    });
    this.expandedStates[categoryIndex] = true; // Set expanded state to true for this panel
  }

  // Handle panel closing - uncheck all items when a panel is closed
  onPanelClosed(categoryIndex: number): void {
    // Uncheck all items in the closed category
    this.groceryData[categoryIndex].items.forEach((item: { checked: boolean; }) => {
      item.checked = false;
    });
    this.expandedStates[categoryIndex] = false; // Set expanded state to false for this panel
  }

  // Function to handle the change in quantity
  updateQuantity(categoryIndex: number, itemIndex: number, newQuantity: string): void {
    this.groceryData[categoryIndex].items[itemIndex].quantity = newQuantity;
  }

  // Function to handle the unit change
  updateUnit(categoryIndex: number, itemIndex: number, newUnit: string): void {
    this.groceryData[categoryIndex].items[itemIndex].unit = newUnit;
  }

  // Function to handle checkbox change
  toggleItemSelection(categoryIndex: number, itemIndex: number, checked: boolean): void {
    this.groceryData[categoryIndex].items[itemIndex].checked = checked;
  }

  // Function to open preview dialog
  openPreview(): void {
    const selectedItems = this.getSelectedItems();

    if (selectedItems.length > 0) {
      const dialogRef = this.dialog.open(GroceryViewComponent, {
        data: {
          selectedItems: selectedItems
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog was closed');
      });
    } else {
      alert("No items selected!");
    }
  }

  // Get the selected items from the grocery data
  getSelectedItems(): any[] {
    const selectedItems: any[] = [];

    this.groceryData.forEach((category: { items: any[]; categoryName: any; }) => {
      category.items.forEach(item => {
        if (item.checked) {
          selectedItems.push({
            item: item.item,
            quantity: item.quantity,
            unit: item.unit,
            category: category.categoryName
          });
        }
      });
    });

    return selectedItems;
  }



}
