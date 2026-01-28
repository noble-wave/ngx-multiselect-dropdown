# ngx-multiselect-dropdown

A modern, fully-featured multiselect dropdown component for Angular 17+, built with **Signals** and **standalone architecture**.

[![Angular](https://img.shields.io/badge/Angular-21+-red)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## ✨ Features

- 🚀 **Modern Angular** - Built for Angular 17+ with Signals
- 📦 **Standalone Component** - No NgModules required
- 🎯 **Forms Integration** - Full `ControlValueAccessor` support (ngModel, Reactive Forms)
- 🔍 **Search & Filter** - Built-in search functionality
- ⌨️ **Keyboard Navigation** - Full keyboard support (Arrow keys, Enter, Escape, Home, End)
- ♿ **Accessibility** - ARIA attributes for screen readers
- 🎨 **Themeable** - CSS custom properties for easy customization
- 📱 **Responsive** - Works on all screen sizes
- 🔧 **TypeScript** - Fully typed with strict mode
- 🪶 **Lightweight** - Zero external dependencies

## 📦 Installation

```bash
npm install ngx-multiselect-dropdown
```

## 🚀 Quick Start

### Import the Component

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MultiselectDropdownComponent],
  template: `
    <ngx-multiselect-dropdown
      [data]="items"
      [(ngModel)]="selectedItems"
      placeholder="Select items"
    />
  `,
})
export class AppComponent {
  items = ['Apple', 'Banana', 'Cherry', 'Date'];
  selectedItems = [];
}
```

## 📖 Usage Examples

### Basic Multi-Select

```typescript
import { Component, signal } from '@angular/core';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MultiselectDropdownComponent],
  template: `
    <ngx-multiselect-dropdown
      [data]="fruits()"
      [(ngModel)]="selection"
      placeholder="Select fruits"
    />
  `,
})
export class ExampleComponent {
  fruits = signal(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']);
  selection = signal([]);
}
```

### Object Array with Custom Fields

```typescript
interface City {
  id: number;
  name: string;
  country: string;
}

@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="cities()"
      [config]="{
        fieldMapping: {
          idField: 'id',
          textField: 'name',
          disabledField: 'disabled'
        }
      }"
      [(ngModel)]="selectedCities"
    />
  `,
})
export class CityComponent {
  cities = signal<City[]>([
    { id: 1, name: 'New York', country: 'USA' },
    { id: 2, name: 'London', country: 'UK' },
    { id: 3, name: 'Paris', country: 'France' },
  ]);
  selectedCities = signal<City[]>([]);
}
```

### Single Selection Mode

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="items"
      [config]="{ singleSelection: true }"
      [(ngModel)]="selectedItem"
      placeholder="Choose one"
    />
  `,
})
export class SingleSelectComponent {
  items = ['Option 1', 'Option 2', 'Option 3'];
  selectedItem = null;
}
```

### With Search Filter

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="largeList"
      [config]="{
        enableSearch: true,
        searchPlaceholder: 'Search items...'
      }"
      [(ngModel)]="selection"
      (searchChange)="onSearch($event)"
    />
  `,
})
export class SearchComponent {
  largeList = [...Array(100)].map((_, i) => `Item ${i + 1}`);
  selection = [];

  onSearch(term: string) {
    console.log('Searching for:', term);
  }
}
```

### With Selection Limit

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="items"
      [config]="{
        selectionLimit: 3,
        displayLimit: 2
      }"
      [(ngModel)]="selection"
      placeholder="Select up to 3 items"
    />
  `,
})
export class LimitComponent {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  selection = [];
}
```

### Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, MultiselectDropdownComponent],
  template: `
    <form>
      <ngx-multiselect-dropdown
        [data]="items"
        [formControl]="itemsControl"
      />
    </form>
  `,
})
export class ReactiveComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  itemsControl = new FormControl([]);
}
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `singleSelection` | `boolean` | `false` | Enable single selection mode |
| `fieldMapping` | `DropdownFieldMapping` | See below | Custom field mapping for objects |
| `enableSelectAll` | `boolean` | `true` | Show "Select All" checkbox |
| `selectAllText` | `string` | `'Select All'` | Text for select all action |
| `unselectAllText` | `string` | `'Unselect All'` | Text for unselect all action |
| `enableSearch` | `boolean` | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | `'Search...'` | Placeholder for search input |
| `clearSearchOnClose` | `boolean` | `true` | Clear search when dropdown closes |
| `selectionLimit` | `number` | `-1` | Maximum selections (-1 = unlimited) |
| `displayLimit` | `number` | `3` | Max items to show before "+X more" |
| `closeOnSelect` | `boolean` | `false` | Close dropdown after selection |
| `showSelectedAtTop` | `boolean` | `false` | Show selected items at top |
| `maxHeight` | `number` | `300` | Maximum height in pixels |
| `noDataText` | `string` | `'No items available'` | Message when no data |
| `noResultsText` | `string` | `'No results found'` | Message when search has no results |

### Field Mapping (Default)

```typescript
{
  idField: 'id',
  textField: 'text',
  disabledField: 'disabled'
}
```

## 🎨 Theming

Customize the appearance using CSS custom properties:

```css
ngx-multiselect-dropdown {
  /* Colors */
  --ngx-dropdown-bg: #ffffff;
  --ngx-dropdown-border-color: #cbd5e1;
  --ngx-dropdown-text-color: #1e293b;
  --ngx-dropdown-placeholder-color: #64748b;
  --ngx-dropdown-hover-bg: #f1f5f9;
  --ngx-dropdown-selected-bg: #e0f2fe;
  --ngx-dropdown-disabled-bg: #f8fafc;
  --ngx-dropdown-disabled-text: #94a3b8;
  --ngx-dropdown-focus-ring: #3b82f6;

  /* Spacing */
  --ngx-dropdown-padding: 0.5rem 0.75rem;
  --ngx-dropdown-border-radius: 0.375rem;
  --ngx-dropdown-item-padding: 0.5rem 0.75rem;

  /* Shadows */
  --ngx-dropdown-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

## ⌨️ Keyboard Navigation

| Key | Action |
|-----|--------|
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Open dropdown or select focused item |
| <kbd>Escape</kbd> | Close dropdown |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Navigate through items |
| <kbd>Home</kbd> / <kbd>End</kbd> | Jump to first/last item |

## 📡 Events

| Event | Payload | Description |
|-------|---------|-------------|
| `selectionChange` | `DropdownItem[]` | Emitted when selection changes |
| `dropdownOpen` | `void` | Emitted when dropdown opens |
| `dropdownClose` | `void` | Emitted when dropdown closes |
| `searchChange` | `string` | Emitted when search term changes |

## 🧪 API Reference

### Component Inputs

```typescript
@Input() data: T[] = [];
@Input() config: DropdownConfig = {};
@Input() placeholder: string = 'Select';
@Input() disabled: boolean = false;
```

### Component Outputs

```typescript
@Output() selectionChange = output<DropdownItem<T>[]>();
@Output() dropdownOpen = output<void>();
@Output() dropdownClose = output<void>();
@Output() searchChange = output<string>();
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Run tests (TODO)
npm test

# Build library
npm run build
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📮 Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/yourusername/ngx-multiselect-dropdown/issues).

---

Made with ❤️ using Angular Signals
