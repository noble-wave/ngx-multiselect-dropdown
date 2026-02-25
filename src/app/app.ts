import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import {
  MultiselectDropdownComponent,
  DropdownConfig,
  DropdownItem,
} from '../public-api';

interface City {
  id: number;
  name: string;
  country: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, JsonPipe, MultiselectDropdownComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ngx-multiselect-dropdown');
  protected readonly currentYear = new Date().getFullYear();

  // Simple string array example
  protected simpleItems = signal<string[]>(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);
  protected simpleSelection = signal<string[]>([]);

  // Object array example
  protected cities = signal<City[]>([
    { id: 1, name: 'New York', country: 'USA' },
    { id: 2, name: 'London', country: 'UK' },
    { id: 3, name: 'Paris', country: 'France' },
    { id: 4, name: 'Tokyo', country: 'Japan' },
    { id: 5, name: 'Sydney', country: 'Australia' },
    { id: 6, name: 'Berlin', country: 'Germany', disabled: true },
    { id: 7, name: 'Toronto', country: 'Canada' },
    { id: 8, name: 'Mumbai', country: 'India' },
  ]);
  protected citySelection = signal<City[]>([]);

  // Single selection example
  protected singleSelection = signal<City | null>(null);
  protected singleConfig = signal<DropdownConfig>({
    singleSelection: true,
    fieldMapping: {
      idField: 'id',
      textField: 'name',
      disabledField: 'disabled',
    },
  });

  // Multi-select with search
  protected searchConfig = signal<DropdownConfig>({
    enableSearch: true,
    enableSelectAll: true,
    searchPlaceholder: 'Search cities...',
    fieldMapping: {
      idField: 'id',
      textField: 'name',
      disabledField: 'disabled',
    },
  });
  protected searchSelection = signal<City[]>([]);

  // With selection limit
  protected limitConfig = signal<DropdownConfig>({
    selectionLimit: 3,
    displayLimit: 2,
    enableSelectAll: true,
    fieldMapping: {
      idField: 'id',
      textField: 'name',
      disabledField: 'disabled',
    },
  });
  protected limitSelection = signal<City[]>([]);

  // Close on select
  protected closeOnSelectConfig = signal<DropdownConfig>({
    closeOnSelect: true,
    enableSelectAll: true,
    fieldMapping: {
      idField: 'id',
      textField: 'name',
      disabledField: 'disabled',
    },


  });
  protected closeSelection = signal<City[]>([]);

  protected handleSelectionChange(items: DropdownItem<any>[]): void {
    console.log('Selection changed:', items);
  }

  protected handleSearchChange(term: string): void {
    console.log('Search term:', term);
  }
}

