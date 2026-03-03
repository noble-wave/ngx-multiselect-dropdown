# Frequently Asked Questions (FAQ)

Common questions about **ngx-multiselect-dropdown** - the modern Angular multiselect dropdown component.

## 📋 Table of Contents

- [General Questions](#general-questions)
- [Installation & Setup](#installation--setup)
- [Usage & Integration](#usage--integration)
- [Features & Configuration](#features--configuration)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)
- [Browser & Compatibility](#browser--compatibility)
- [Accessibility](#accessibility)
- [Migration & Comparison](#migration--comparison)

## General Questions

### What is ngx-multiselect-dropdown?

**ngx-multiselect-dropdown** is a modern, feature-rich Angular multiselect dropdown component built with Angular Signals and standalone architecture. It provides a comprehensive solution for selecting multiple items from a list with features like search, keyboard navigation, accessibility, and zero external dependencies.

Perfect for forms, filters, data selection, and any multi-choice interface in Angular 17+ applications.

### Why choose ngx-multiselect-dropdown over other Angular dropdown libraries?

Key advantages:
- ✅ **Zero dependencies** - No external libraries required
- ✅ **Modern Angular** - Built with Signals and standalone components
- ✅ **Lightweight** - Only ~5KB gzipped
- ✅ **TypeScript strict mode** - Complete type safety
- ✅ **WCAG 2.1 compliant** - Full accessibility support
- ✅ **Active maintenance** - Regular updates and community support

### Is ngx-multiselect-dropdown free?

Yes! It's completely free and open-source under the MIT License. You can use it in personal and commercial projects without any restrictions.

### Which Angular versions are supported?

The component supports:
- Angular 17+
- Angular 18
- Angular 19
- Angular 20
- Angular 21+

Future versions will be supported as Angular evolves.

## Installation & Setup

### How do I install ngx-multiselect-dropdown?

```bash
npm install ngx-multiselect-dropdown
```

Or with yarn:
```bash
yarn add ngx-multiselect-dropdown
```

Or with pnpm:
```bash
pnpm add ngx-multiselect-dropdown
```

### Do I need to install any additional dependencies?

No! **ngx-multiselect-dropdown** has zero external dependencies. You only need Angular core packages (which you already have in your Angular project).

### How do I import the component in my Angular app?

Since it's a standalone component, simply import it where needed:

```typescript
import { Component } from '@angular/core';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

@Component({
  standalone: true,
  imports: [MultiselectDropdownComponent],
  // ...
})
export class YourComponent {}
```

### Does it work with Angular modules (NgModules)?

Yes! While the component is standalone, you can still use it in module-based applications:

```typescript
import { NgModule } from '@angular/core';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

@NgModule({
  imports: [MultiselectDropdownComponent],
  // ...
})
export class YourModule {}
```

## Usage & Integration

### How do I use it with ngModel?

```typescript
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

@Component({
  imports: [FormsModule, MultiselectDropdownComponent],
  template: `
    <ngx-multiselect-dropdown
      [data]="items"
      [(ngModel)]="selectedItems"
      placeholder="Select items"
    />
  `
})
export class MyComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  selectedItems = [];
}
```

### How do I use it with Reactive Forms?

```typescript
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

@Component({
  imports: [ReactiveFormsModule, MultiselectDropdownComponent],
  template: `
    <ngx-multiselect-dropdown
      [data]="items"
      [formControl]="itemsControl"
    />
  `
})
export class MyComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  itemsControl = new FormControl([]);
}
```

### Can I use it with complex objects?

Yes! Configure field mapping for objects:

```typescript
interface User {
  userId: number;
  userName: string;
  isActive: boolean;
}

@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="users"
      [config]="{
        fieldMapping: {
          idField: 'userId',
          textField: 'userName',
          disabledField: 'isActive'
        }
      }"
      [(ngModel)]="selectedUsers"
    />
  `
})
export class MyComponent {
  users: User[] = [
    { userId: 1, userName: 'John', isActive: true },
    { userId: 2, userName: 'Jane', isActive: false }
  ];
  selectedUsers: User[] = [];
}
```

### How do I get notified when selection changes?

Use the `selectionChange` event:

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="items"
      [(ngModel)]="selection"
      (selectionChange)="onSelectionChange($event)"
    />
  `
})
export class MyComponent {
  items = ['Item 1', 'Item 2'];
  selection = [];
  
  onSelectionChange(newSelection: any[]) {
    console.log('Selection changed:', newSelection);
    // Perform actions based on selection
  }
}
```

## Features & Configuration

### How do I enable search functionality?

Set `enableSearch` to true in the configuration:

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="items"
      [config]="{
        enableSearch: true,
        searchPlaceholder: 'Search items...'
      }"
      [(ngModel)]="selection"
    />
  `
})
```

### Can I use it for single selection instead of multiple?

Yes! Enable single selection mode:

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="items"
      [config]="{
        singleSelection: true,
        closeOnSelect: true
      }"
      [(ngModel)]="selectedItem"
    />
  `
})
export class MyComponent {
  items = ['Option 1', 'Option 2', 'Option 3'];
  selectedItem = null; // Single item, not an array
}
```

### How do I limit the number of selections?

Use the `selectionLimit` configuration:

```typescript
[config]="{
  selectionLimit: 5  // User can select maximum 5 items
}"
```

### How do I customize the appearance?

Use CSS custom properties:

```css
ngx-multiselect-dropdown {
  --ngx-dropdown-bg: #ffffff;
  --ngx-dropdown-border-color: #cbd5e1;
  --ngx-dropdown-text-color: #1e293b;
  --ngx-dropdown-hover-bg: #f1f5f9;
  --ngx-dropdown-selected-bg: #e0f2fe;
  --ngx-dropdown-focus-ring: #3b82f6;
}
```

### Can I disable the "Select All" checkbox?

Yes:

```typescript
[config]="{
  enableSelectAll: false
}"
```

### How do I show selected items at the top?

```typescript
[config]="{
  showSelectedAtTop: true
}"
```

### Can I customize the placeholder text?

```typescript
<ngx-multiselect-dropdown
  [data]="items"
  placeholder="Your custom placeholder text"
/>
```

## Performance

### How does it handle large datasets?

The component is optimized for large datasets:

```typescript
// Efficiently handles thousands of items
items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
```

For extremely large datasets (10,000+ items), enable virtual scrolling (coming soon).

### Does it support lazy loading?

Yes, you can implement lazy loading with the search feature:

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="items"
      (searchChange)="loadItems($event)"
    />
  `
})
export class MyComponent {
  items = [];
  
  loadItems(searchTerm: string) {
    this.apiService.search(searchTerm).subscribe(results => {
      this.items = results;
    });
  }
}
```

### Is it optimized for mobile devices?

Yes! The component is:
- Touch-friendly
- Responsive on all screen sizes
- Optimized for mobile performance
- Works with mobile keyboards

## Troubleshooting

### The dropdown is not showing. What's wrong?

Common solutions:

1. **Check imports**: Ensure you've imported the component
2. **Check data**: Verify your data array is not empty
3. **Check z-index**: The dropdown might be behind other elements
4. **Check parent container**: Some CSS styles might clip the dropdown

### Why is my form not recognizing the component?

Make sure you've imported `FormsModule` or `ReactiveFormsModule`:

```typescript
import { FormsModule } from '@angular/forms'; // For ngModel
// OR
import { ReactiveFormsModule } from '@angular/forms'; // For form controls
```

### How do I reset the selection programmatically?

```typescript
// For arrays (multi-select)
this.selectedItems = [];

// For FormControl
this.myFormControl.setValue([]);

// For single selection
this.selectedItem = null;
```

### The search is not case-sensitive. Can I make it case-sensitive?

Currently, search is case-insensitive by default for better UX. Case-sensitive search is on the roadmap.

### Can I get the raw selected data instead of formatted items?

Yes! The `selectionChange` event and ngModel binding return the original selected items.

## Browser & Compatibility

### Which browsers are supported?

Modern browsers:
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

### Does it work in IE11?

No. Internet Explorer 11 is not supported. The component requires modern browser features and Angular 17+, which doesn't support IE11.

### Is it compatible with Server-Side Rendering (SSR)?

Yes! The component is compatible with Angular Universal and SSR.

### Does it work in Progressive Web Apps (PWAs)?

Yes! The component works perfectly in PWAs.

## Accessibility

### Is it accessible for screen readers?

Yes! The component includes:
- ARIA attributes
- Proper semantic HTML
- Screen reader announcements
- Keyboard-only navigation

### What keyboard shortcuts are supported?

| Key | Action |
|-----|--------|
| Enter / Space | Open dropdown or select item |
| Escape | Close dropdown |
| Arrow Up/Down | Navigate items |
| Home / End | First/last item |
| Tab | Move focus |

### Is it WCAG compliant?

Yes! The component follows WCAG 2.1 Level AA guidelines.

### Can I customize ARIA labels?

Yes (coming soon):

```typescript
[config]="{
  ariaLabel: 'Custom dropdown label',
  ariaDescribedBy: 'help-text-id'
}"
```

## Migration & Comparison

### How do I migrate from ng-multiselect-dropdown?

Key changes:
1. Update component selector: `ngx-multiselect-dropdown`
2. Import as standalone component
3. Update configuration object structure
4. Review event names

See [Migration Guide](MIGRATION.md) for details.

### What's the difference between ng-multiselect-dropdown and ngx-multiselect-dropdown?

| Feature | ng-multiselect-dropdown | ngx-multiselect-dropdown |
|---------|------------------------|--------------------------|
| Angular Version | Older (up to 16) | Modern (17+) |
| Architecture | NgModule | Standalone |
| State Management | Traditional | Signals |
| Dependencies | Some | Zero |
| Maintenance | Legacy | Active |

### Can I use both ng-select and ngx-multiselect-dropdown in the same project?

Yes, but we recommend choosing one to keep your bundle size small and maintain consistency.

### How does it compare to Angular Material Select?

**ngx-multiselect-dropdown**:
- Lighter weight (~5KB vs ~100KB+)
- No Material Design dependency
- More customizable themes
- Zero dependencies

**Angular Material Select**:
- Official Angular Material component
- Full Material Design styling
- Part of Material ecosystem

Choose based on your project needs!

## Still Have Questions?

- 📖 [Read the Documentation](../README.md)
- 💬 [Start a Discussion](https://github.com/noble-wave/ngx-multiselect-dropdown/discussions)
- 🐛 [Report an Issue](https://github.com/noble-wave/ngx-multiselect-dropdown/issues)
- 📧 [Email Support](mailto:info@noble-wave.com)

---

**Can't find your question? [Submit it here](https://github.com/noble-wave/ngx-multiselect-dropdown/discussions/new?category=q-a) and we'll add it to this FAQ!**
