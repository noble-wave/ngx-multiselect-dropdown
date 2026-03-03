# API Reference

Complete API documentation for **ngx-multiselect-dropdown** - the modern Angular multiselect dropdown component.

## 📚 Table of Contents

- [Component API](#component-api)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
  - [Methods](#methods)
- [Interfaces](#interfaces)
- [Types](#types)
- [Configuration](#configuration)
- [CSS Custom Properties](#css-custom-properties)
- [Examples](#examples)

## Component API

### Component Selector

```typescript
ngx-multiselect-dropdown
```

### Inputs

#### `data`
- **Type**: `T[]`
- **Default**: `[]`
- **Required**: Yes
- **Description**: Array of items to display in the dropdown. Can be strings, numbers, or objects.

**Example**:
```typescript
// String array
[data]="['Item 1', 'Item 2', 'Item 3']"

// Object array
[data]="[
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
]"
```

#### `config`
- **Type**: `DropdownConfig`
- **Default**: `{}`
- **Required**: No
- **Description**: Configuration object for dropdown behavior and appearance.

**Example**:
```typescript
[config]="{
  singleSelection: false,
  enableSearch: true,
  selectionLimit: 5
}"
```

#### `placeholder`
- **Type**: `string`
- **Default**: `'Select'`
- **Required**: No
- **Description**: Placeholder text shown when no items are selected.

**Example**:
```typescript
placeholder="Choose your options"
```

#### `disabled`
- **Type**: `boolean`
- **Default**: `false`
- **Required**: No
- **Description**: Disables the dropdown when true.

**Example**:
```typescript
[disabled]="isFormDisabled"
```

### Outputs

#### `selectionChange`
- **Type**: `EventEmitter<DropdownItem<T>[]>`
- **Description**: Emitted when the selection changes. Returns array of selected items.

**Example**:
```typescript
(selectionChange)="onSelectionChange($event)"
```

#### `dropdownOpen`
- **Type**: `EventEmitter<void>`
- **Description**: Emitted when the dropdown is opened.

**Example**:
```typescript
(dropdownOpen)="onDropdownOpen()"
```

#### `dropdownClose`
- **Type**: `EventEmitter<void>`
- **Description**: Emitted when the dropdown is closed.

**Example**:
```typescript
(dropdownClose)="onDropdownClose()"
```

#### `searchChange`
- **Type**: `EventEmitter<string>`
- **Description**: Emitted when the search term changes. Returns the current search string.

**Example**:
```typescript
(searchChange)="onSearch($event)"
```

### Methods

#### `open()`
- **Description**: Programmatically opens the dropdown.
- **Returns**: `void`

**Example**:
```typescript
@ViewChild(MultiselectDropdownComponent) dropdown!: MultiselectDropdownComponent;

openDropdown() {
  this.dropdown.open();
}
```

#### `close()`
- **Description**: Programmatically closes the dropdown.
- **Returns**: `void`

**Example**:
```typescript
closeDropdown() {
  this.dropdown.close();
}
```

#### `selectAll()`
- **Description**: Selects all available items.
- **Returns**: `void`

**Example**:
```typescript
selectAllItems() {
  this.dropdown.selectAll();
}
```

#### `deselectAll()`
- **Description**: Deselects all items.
- **Returns**: `void`

**Example**:
```typescript
clearSelection() {
  this.dropdown.deselectAll();
}
```

## Interfaces

### `DropdownConfig`

Configuration interface for the dropdown component.

```typescript
interface DropdownConfig {
  // Selection Settings
  singleSelection?: boolean;           // Enable single selection mode
  selectionLimit?: number;             // Maximum selections allowed (-1 = unlimited)
  displayLimit?: number;               // Max items to show before "+X more"
  closeOnSelect?: boolean;             // Close dropdown after selection
  showSelectedAtTop?: boolean;         // Show selected items at top
  
  // Search Settings
  enableSearch?: boolean;              // Enable search functionality
  searchPlaceholder?: string;          // Placeholder for search input
  clearSearchOnClose?: boolean;        // Clear search when dropdown closes
  
  // Select All Settings
  enableSelectAll?: boolean;           // Show "Select All" checkbox
  selectAllText?: string;              // Text for select all action
  unselectAllText?: string;            // Text for unselect all action
  
  // Field Mapping (for objects)
  fieldMapping?: DropdownFieldMapping; // Custom field names
  
  // Display Settings
  maxHeight?: number;                  // Maximum dropdown height in pixels
  noDataText?: string;                 // Message when no data
  noResultsText?: string;              // Message when search has no results
  
  // Accessibility
  ariaLabel?: string;                  // ARIA label for dropdown
  ariaDescribedBy?: string;            // ARIA described-by ID
}
```

### `DropdownFieldMapping`

Field mapping for object arrays.

```typescript
interface DropdownFieldMapping {
  idField?: string;        // Field to use as unique identifier
  textField?: string;      // Field to display as item text
  disabledField?: string;  // Field to determine if item is disabled
}
```

**Default Values**:
```typescript
{
  idField: 'id',
  textField: 'text',
  disabledField: 'disabled'
}
```

### `DropdownItem<T>`

Internal item representation.

```typescript
interface DropdownItem<T = any> {
  id: string | number;     // Unique identifier
  text: string;            // Display text
  disabled?: boolean;      // Whether item is disabled
  data?: T;               // Original data object
}
```

## Types

### `SelectionMode`

```typescript
type SelectionMode = 'single' | 'multi';
```

### `DropdownState`

```typescript
type DropdownState = 'open' | 'closed' | 'disabled';
```

## Configuration

### Complete Configuration Example

```typescript
const dropdownConfig: DropdownConfig = {
  // Selection
  singleSelection: false,
  selectionLimit: -1,        // Unlimited
  displayLimit: 3,
  closeOnSelect: false,
  showSelectedAtTop: false,
  
  // Search
  enableSearch: true,
  searchPlaceholder: 'Search...',
  clearSearchOnClose: true,
  
  // Select All
  enableSelectAll: true,
  selectAllText: 'Select All',
  unselectAllText: 'Unselect All',
  
  // Field Mapping
  fieldMapping: {
    idField: 'id',
    textField: 'text',
    disabledField: 'disabled'
  },
  
  // Display
  maxHeight: 300,
  noDataText: 'No items available',
  noResultsText: 'No results found',
  
  // Accessibility
  ariaLabel: 'Multi-select dropdown',
  ariaDescribedBy: 'dropdown-help'
};
```

## CSS Custom Properties

Customize the dropdown appearance using CSS variables.

### Color Properties

```css
ngx-multiselect-dropdown {
  /* Background Colors */
  --ngx-dropdown-bg: #ffffff;
  --ngx-dropdown-list-bg: #ffffff;
  --ngx-dropdown-hover-bg: #f1f5f9;
  --ngx-dropdown-selected-bg: #e0f2fe;
  --ngx-dropdown-disabled-bg: #f8fafc;
  
  /* Text Colors */
  --ngx-dropdown-text-color: #1e293b;
  --ngx-dropdown-placeholder-color: #64748b;
  --ngx-dropdown-disabled-text: #94a3b8;
  
  /* Border Colors */
  --ngx-dropdown-border-color: #cbd5e1;
  --ngx-dropdown-focus-ring: #3b82f6;
}
```

### Spacing Properties

```css
ngx-multiselect-dropdown {
  /* Padding */
  --ngx-dropdown-padding: 0.5rem 0.75rem;
  --ngx-dropdown-item-padding: 0.5rem 0.75rem;
  
  /* Border Radius */
  --ngx-dropdown-border-radius: 0.375rem;
  
  /* Gaps */
  --ngx-dropdown-gap: 0.5rem;
}
```

### Shadow Properties

```css
ngx-multiselect-dropdown {
  --ngx-dropdown-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --ngx-dropdown-focus-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Typography Properties

```css
ngx-multiselect-dropdown {
  --ngx-dropdown-font-size: 0.875rem;
  --ngx-dropdown-line-height: 1.5;
  --ngx-dropdown-font-weight: 400;
}
```

### Layout Properties

```css
ngx-multiselect-dropdown {
  --ngx-dropdown-max-height: 300px;
  --ngx-dropdown-min-width: 200px;
  --ngx-dropdown-z-index: 1000;
}
```

## Examples

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [MultiselectDropdownComponent],
  template: `
    <ngx-multiselect-dropdown
      [data]="items"
      [(ngModel)]="selection"
      placeholder="Select items"
    />
  `
})
export class BasicComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  selection = [];
}
```

### With All Features

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="employees"
      [(ngModel)]="selectedEmployees"
      [config]="dropdownConfig"
      [disabled]="isDisabled"
      placeholder="Select employees"
      (selectionChange)="onSelectionChange($event)"
      (dropdownOpen)="onOpen()"
      (dropdownClose)="onClose()"
      (searchChange)="onSearch($event)"
    />
  `
})
export class FullFeaturesComponent {
  employees = [
    { id: 1, name: 'John Doe', active: true },
    { id: 2, name: 'Jane Smith', active: true },
    { id: 3, name: 'Bob Johnson', active: false }
  ];
  
  selectedEmployees = [];
  isDisabled = false;
  
  dropdownConfig: DropdownConfig = {
    singleSelection: false,
    enableSearch: true,
    enableSelectAll: true,
    selectionLimit: 5,
    displayLimit: 3,
    fieldMapping: {
      idField: 'id',
      textField: 'name',
      disabledField: 'active'
    },
    searchPlaceholder: 'Search employees...',
    noDataText: 'No employees found',
    maxHeight: 250
  };
  
  onSelectionChange(selection: any[]) {
    console.log('Selection:', selection);
  }
  
  onOpen() {
    console.log('Dropdown opened');
  }
  
  onClose() {
    console.log('Dropdown closed');
  }
  
  onSearch(term: string) {
    console.log('Searching:', term);
  }
}
```

### Form Integration

```typescript
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule, MultiselectDropdownComponent],
  template: `
    <form [formGroup]="form">
      <ngx-multiselect-dropdown
        [data]="skills"
        formControlName="selectedSkills"
        [config]="{ enableSearch: true }"
      />
      
      @if (form.get('selectedSkills')?.hasError('required')) {
        <span class="error">Please select at least one skill</span>
      }
    </form>
  `
})
export class FormComponent {
  skills = ['Angular', 'React', 'Vue', 'TypeScript'];
  
  form = this.fb.group({
    selectedSkills: [[], Validators.required]
  });
  
  constructor(private fb: FormBuilder) {}
}
```

### Custom Styling

```typescript
@Component({
  styles: [`
    /* Dark theme */
    .dark-dropdown ngx-multiselect-dropdown {
      --ngx-dropdown-bg: #1e293b;
      --ngx-dropdown-text-color: #f1f5f9;
      --ngx-dropdown-border-color: #475569;
      --ngx-dropdown-hover-bg: #334155;
    }
    
    /* Compact size */
    .compact-dropdown ngx-multiselect-dropdown {
      --ngx-dropdown-padding: 0.25rem 0.5rem;
      --ngx-dropdown-font-size: 0.75rem;
    }
  `],
  template: `
    <div class="dark-dropdown">
      <ngx-multiselect-dropdown [data]="items" />
    </div>
  `
})
export class StyledComponent {
  items = ['Item 1', 'Item 2'];
}
```

## TypeScript Types

### Import Types

```typescript
import type {
  DropdownConfig,
  DropdownFieldMapping,
  DropdownItem
} from 'ngx-multiselect-dropdown';
```

### Generic Type Usage

```typescript
interface User {
  userId: number;
  userName: string;
}

// Type-safe component usage
@Component({
  template: `
    <ngx-multiselect-dropdown<User>
      [data]="users"
      [(ngModel)]="selectedUsers"
    />
  `
})
export class TypedComponent {
  users: User[] = [];
  selectedUsers: User[] = [];
}
```

## ControlValueAccessor

The component implements `ControlValueAccessor` for seamless form integration.

### Methods

- `writeValue(value: any): void` - Sets the value programmatically
- `registerOnChange(fn: any): void` - Registers change callback
- `registerOnTouched(fn: any): void` - Registers touch callback
- `setDisabledState(disabled: boolean): void` - Sets disabled state

### Usage

```typescript
// These methods are called automatically by Angular Forms
// You don't need to call them manually
```

## Version Compatibility

| Component Version | Angular Version | TypeScript Version |
|------------------|-----------------|-------------------|
| 1.x.x            | 17+             | 5.0+              |

## Browser Support

Supports all modern browsers that Angular supports:
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Related Documentation

- [README](../README.md) - Getting started guide
- [Examples](EXAMPLES.md) - Comprehensive examples
- [FAQ](FAQ.md) - Frequently asked questions
- [Contributing](../CONTRIBUTING.md) - Contribution guidelines

## Need Help?

- 📖 [Read the full documentation](../README.md)
- 💬 [Ask questions in Discussions](https://github.com/noble-wave/ngx-multiselect-dropdown/discussions)
- 🐛 [Report issues on GitHub](https://github.com/noble-wave/ngx-multiselect-dropdown/issues)

---

**API documentation last updated**: March 3, 2026

**Component version**: 1.0.0
