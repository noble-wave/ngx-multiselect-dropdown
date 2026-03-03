# ngx-multiselect-dropdown - Comprehensive Examples

This guide provides detailed examples for implementing **ngx-multiselect-dropdown** in your Angular applications. Each example includes working code, explanations, and common use cases.

## 📚 Table of Contents

1. [Basic Examples](#basic-examples)
2. [Form Integration](#form-integration)
3. [Advanced Configuration](#advanced-configuration)
4. [Styling & Theming](#styling--theming)
5. [Real-World Use Cases](#real-world-use-cases)
6. [Performance Optimization](#performance-optimization)
7. [Accessibility Examples](#accessibility-examples)
8. [Common Patterns](#common-patterns)

## 🚀 Basic Examples

### Simple String Array

The simplest way to use the multiselect dropdown with a string array:

```typescript
import { Component, signal } from '@angular/core';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

@Component({
  selector: 'app-simple-example',
  standalone: true,
  imports: [MultiselectDropdownComponent],
  template: `
    <ngx-multiselect-dropdown
      [data]="fruits()"
      [(ngModel)]="selectedFruits"
      placeholder="Choose your favorite fruits"
    />
    
    <div class="selected-items">
      <h3>You selected:</h3>
      <ul>
        @for (fruit of selectedFruits(); track fruit) {
          <li>{{ fruit }}</li>
        }
      </ul>
    </div>
  `
})
export class SimpleExampleComponent {
  fruits = signal(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']);
  selectedFruits = signal<string[]>([]);
}
```

### Object Array

Working with complex objects using field mapping:

```typescript
interface Product {
  productId: number;
  productName: string;
  category: string;
  price: number;
  inStock: boolean;
}

@Component({
  selector: 'app-object-example',
  standalone: true,
  imports: [MultiselectDropdownComponent],
  template: `
    <ngx-multiselect-dropdown
      [data]="products()"
      [config]="{
        fieldMapping: {
          idField: 'productId',
          textField: 'productName',
          disabledField: 'inStock'
        },
        enableSearch: true,
        searchPlaceholder: 'Search products...'
      }"
      [(ngModel)]="selectedProducts"
      placeholder="Select products"
    />
  `
})
export class ObjectExampleComponent {
  products = signal<Product[]>([
    { productId: 1, productName: 'Laptop', category: 'Electronics', price: 999, inStock: true },
    { productId: 2, productName: 'Mouse', category: 'Accessories', price: 25, inStock: true },
    { productId: 3, productName: 'Keyboard', category: 'Accessories', price: 75, inStock: false },
    { productId: 4, productName: 'Monitor', category: 'Electronics', price: 299, inStock: true }
  ]);
  
  selectedProducts = signal<Product[]>([]);
}
```

## 📋 Form Integration

### Template-Driven Forms

Using ngModel with template-driven forms:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule, MultiselectDropdownComponent],
  template: `
    <form #userForm="ngForm" (ngSubmit)="onSubmit(userForm)">
      <div class="form-group">
        <label for="skills">Skills</label>
        <ngx-multiselect-dropdown
          name="skills"
          [data]="availableSkills"
          [(ngModel)]="user.skills"
          #skillsControl="ngModel"
          required
          placeholder="Select your skills"
        />
        
        @if (skillsControl.invalid && skillsControl.touched) {
          <div class="error">Please select at least one skill</div>
        }
      </div>
      
      <button type="submit" [disabled]="userForm.invalid">Submit</button>
    </form>
  `
})
export class TemplateFormComponent {
  availableSkills = ['Angular', 'TypeScript', 'RxJS', 'JavaScript', 'HTML', 'CSS'];
  
  user = {
    name: '',
    skills: []
  };
  
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form submitted:', this.user);
    }
  }
}
```

### Reactive Forms

Using FormControl with reactive forms:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownComponent } from 'ngx-multiselect-dropdown';

interface Employee {
  name: string;
  department: string[];
  projects: string[];
}

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, MultiselectDropdownComponent],
  template: `
    <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
      <!-- Name Input -->
      <div class="form-group">
        <label>Employee Name</label>
        <input type="text" formControlName="name" />
      </div>
      
      <!-- Departments Multiselect -->
      <div class="form-group">
        <label>Departments</label>
        <ngx-multiselect-dropdown
          [data]="departments"
          formControlName="department"
          [config]="{
            selectionLimit: 3,
            enableSelectAll: true
          }"
          placeholder="Select departments (max 3)"
        />
        
        @if (employeeForm.get('department')?.hasError('required') && 
              employeeForm.get('department')?.touched) {
          <div class="error">Department is required</div>
        }
      </div>
      
      <!-- Projects Multiselect -->
      <div class="form-group">
        <label>Projects</label>
        <ngx-multiselect-dropdown
          [data]="projects"
          formControlName="projects"
          [config]="{
            enableSearch: true,
            showSelectedAtTop: true
          }"
          placeholder="Select projects"
        />
      </div>
      
      <button type="submit" [disabled]="employeeForm.invalid">
        Save Employee
      </button>
    </form>
    
    <div class="form-value">
      <h3>Form Value:</h3>
      <pre>{{ employeeForm.value | json }}</pre>
    </div>
  `
})
export class ReactiveFormComponent implements OnInit {
  employeeForm!: FormGroup;
  
  departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  projects = ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta'];
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      department: [[], Validators.required],
      projects: [[]]
    });
  }
  
  onSubmit() {
    if (this.employeeForm.valid) {
      const employee: Employee = this.employeeForm.value;
      console.log('Employee saved:', employee);
      // API call here
    }
  }
}
```

### Form with Custom Validators

Adding custom validators to the multiselect:

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator: At least 2 selections required
export function minSelectionsValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || !Array.isArray(value) || value.length < min) {
      return { minSelections: { required: min, actual: value?.length || 0 } };
    }
    return null;
  };
}

// Usage in component
this.form = this.fb.group({
  items: [[], [Validators.required, minSelectionsValidator(2)]]
});
```

## ⚙️ Advanced Configuration

### Search with Custom Filter Logic

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="employees"
      [config]="{
        fieldMapping: {
          idField: 'id',
          textField: 'fullName',
          searchFields: ['fullName', 'email', 'department']
        },
        enableSearch: true,
        searchPlaceholder: 'Search by name, email, or department...',
        clearSearchOnClose: false
      }"
      (searchChange)="onSearch($event)"
      [(ngModel)]="selectedEmployees"
    />
  `
})
export class AdvancedSearchComponent {
  employees = [
    { id: 1, fullName: 'John Doe', email: 'john@example.com', department: 'Engineering' },
    { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', department: 'Marketing' },
    // ... more employees
  ];
  
  selectedEmployees = [];
  
  onSearch(searchTerm: string) {
    console.log('User searching for:', searchTerm);
    // You can implement custom search logic here
    // e.g., API call for server-side search
  }
}
```

### Single Selection Mode

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="countries"
      [config]="{
        singleSelection: true,
        closeOnSelect: true,
        enableSearch: true
      }"
      [(ngModel)]="selectedCountry"
      placeholder="Select your country"
    />
    
    @if (selectedCountry) {
      <p>You selected: {{ selectedCountry }}</p>
    }
  `
})
export class SingleSelectComponent {
  countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan'];
  selectedCountry = null;
}
```

### Selection Limits

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="tags"
      [config]="{
        selectionLimit: 5,
        displayLimit: 3,
        enableSelectAll: false
      }"
      [(ngModel)]="selectedTags"
      placeholder="Select up to 5 tags"
      (selectionChange)="onSelectionChange($event)"
    />
    
    <small>Selected: {{ selectedTags.length }} / 5</small>
  `
})
export class SelectionLimitComponent {
  tags = ['Angular', 'React', 'Vue', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js'];
  selectedTags = [];
  
  onSelectionChange(selection: any[]) {
    if (selection.length === 5) {
      console.log('Maximum selection reached!');
    }
  }
}
```

## 🎨 Styling & Theming

### Custom Theme with CSS Variables

```typescript
@Component({
  selector: 'app-themed-dropdown',
  standalone: true,
  imports: [MultiselectDropdownComponent],
  styles: [`
    /* Dark theme example */
    .dark-theme ngx-multiselect-dropdown {
      --ngx-dropdown-bg: #1e293b;
      --ngx-dropdown-border-color: #475569;
      --ngx-dropdown-text-color: #f1f5f9;
      --ngx-dropdown-placeholder-color: #94a3b8;
      --ngx-dropdown-hover-bg: #334155;
      --ngx-dropdown-selected-bg: #1e40af;
      --ngx-dropdown-focus-ring: #3b82f6;
      --ngx-dropdown-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
    }
    
    /* Blue theme example */
    .blue-theme ngx-multiselect-dropdown {
      --ngx-dropdown-bg: #eff6ff;
      --ngx-dropdown-border-color: #3b82f6;
      --ngx-dropdown-text-color: #1e40af;
      --ngx-dropdown-hover-bg: #dbeafe;
      --ngx-dropdown-selected-bg: #bfdbfe;
      --ngx-dropdown-focus-ring: #2563eb;
    }
  `],
  template: `
    <div class="dark-theme">
      <h3>Dark Theme</h3>
      <ngx-multiselect-dropdown
        [data]="items"
        [(ngModel)]="selection1"
        placeholder="Dark themed dropdown"
      />
    </div>
    
    <div class="blue-theme">
      <h3>Blue Theme</h3>
      <ngx-multiselect-dropdown
        [data]="items"
        [(ngModel)]="selection2"
        placeholder="Blue themed dropdown"
      />
    </div>
  `
})
export class ThemedDropdownComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
  selection1 = [];
  selection2 = [];
}
```

## 💼 Real-World Use Cases

### E-commerce Product Filter

```typescript
interface ProductFilter {
  categories: string[];
  brands: string[];
  priceRanges: string[];
  colors: string[];
}

@Component({
  selector: 'app-product-filter',
  template: `
    <div class="filter-panel">
      <h2>Filter Products</h2>
      
      <!-- Categories -->
      <div class="filter-group">
        <label>Categories</label>
        <ngx-multiselect-dropdown
          [data]="filterOptions.categories"
          [(ngModel)]="filters.categories"
          [config]="{ enableSearch: true }"
          placeholder="All Categories"
          (selectionChange)="applyFilters()"
        />
      </div>
      
      <!-- Brands -->
      <div class="filter-group">
        <label>Brands</label>
        <ngx-multiselect-dropdown
          [data]="filterOptions.brands"
          [(ngModel)]="filters.brands"
          [config]="{ enableSearch: true, showSelectedAtTop: true }"
          placeholder="All Brands"
          (selectionChange)="applyFilters()"
        />
      </div>
      
      <!-- Price Range -->
      <div class="filter-group">
        <label>Price Range</label>
        <ngx-multiselect-dropdown
          [data]="filterOptions.priceRanges"
          [(ngModel)]="filters.priceRanges"
          placeholder="Any Price"
          (selectionChange)="applyFilters()"
        />
      </div>
      
      <!-- Colors -->
      <div class="filter-group">
        <label>Colors</label>
        <ngx-multiselect-dropdown
          [data]="filterOptions.colors"
          [(ngModel)]="filters.colors"
          [config]="{ displayLimit: 2 }"
          placeholder="Any Color"
          (selectionChange)="applyFilters()"
        />
      </div>
      
      <button (click)="clearFilters()">Clear All Filters</button>
    </div>
  `
})
export class ProductFilterComponent {
  filterOptions = {
    categories: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'],
    brands: ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG'],
    priceRanges: ['Under $50', '$50-$100', '$100-$500', '$500-$1000', 'Over $1000'],
    colors: ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow']
  };
  
  filters: ProductFilter = {
    categories: [],
    brands: [],
    priceRanges: [],
    colors: []
  };
  
  applyFilters() {
    console.log('Applying filters:', this.filters);
    // Call API or filter local data
  }
  
  clearFilters() {
    this.filters = {
      categories: [],
      brands: [],
      priceRanges: [],
      colors: []
    };
    this.applyFilters();
  }
}
```

### User Permission Management

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

@Component({
  selector: 'app-user-permissions',
  template: `
    <div class="user-management">
      <h2>User Permissions</h2>
      
      <div class="user-info">
        <p><strong>User:</strong> {{ selectedUser?.name }}</p>
        <p><strong>Email:</strong> {{ selectedUser?.email }}</p>
      </div>
      
      <!-- Roles Assignment -->
      <div class="permission-group">
        <label>Roles</label>
        <ngx-multiselect-dropdown
          [data]="availableRoles"
          [(ngModel)]="selectedUser.roles"
          [config]="{
            enableSelectAll: true,
            selectAllText: 'Assign All Roles',
            unselectAllText: 'Remove All Roles'
          }"
          placeholder="Assign roles"
          (selectionChange)="onRolesChange($event)"
        />
      </div>
      
      <!-- Permissions Assignment -->
      <div class="permission-group">
        <label>Specific Permissions</label>
        <ngx-multiselect-dropdown
          [data]="availablePermissions"
          [(ngModel)]="selectedUser.permissions"
          [config]="{
            enableSearch: true,
            searchPlaceholder: 'Search permissions...',
            showSelectedAtTop: true,
            displayLimit: 5
          }"
          placeholder="Assign specific permissions"
        />
      </div>
      
      <button (click)="savePermissions()">Save Changes</button>
    </div>
  `
})
export class UserPermissionsComponent {
  availableRoles = ['Admin', 'Editor', 'Viewer', 'Moderator', 'Contributor'];
  
  availablePermissions = [
    'Create Posts',
    'Edit Posts',
    'Delete Posts',
    'Manage Users',
    'View Analytics',
    'Export Data',
    'Manage Settings',
    'Access API'
  ];
  
  selectedUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    roles: ['Editor'],
    permissions: ['Create Posts', 'Edit Posts']
  };
  
  onRolesChange(roles: string[]) {
    console.log('Roles changed:', roles);
    // Automatically assign permissions based on roles
  }
  
  savePermissions() {
    console.log('Saving permissions:', this.selectedUser);
    // API call to save
  }
}
```

## ⚡ Performance Optimization

### Virtual Scrolling for Large Datasets

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="largeDataset"
      [config]="{
        enableSearch: true,
        virtualScroll: true,
        maxHeight: 300
      }"
      [(ngModel)]="selection"
      placeholder="Select from 10,000 items"
    />
  `
})
export class LargeDatasetComponent implements OnInit {
  largeDataset: any[] = [];
  selection = [];
  
  ngOnInit() {
    // Generate 10,000 items
    this.largeDataset = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      text: `Item ${i + 1}`
    }));
  }
}
```

## ♿ Accessibility Examples

### Fully Accessible Dropdown

```typescript
@Component({
  template: `
    <div role="region" aria-label="User Selection Form">
      <label id="user-select-label" for="user-select">
        Select Users
        <span class="required" aria-label="required">*</span>
      </label>
      
      <ngx-multiselect-dropdown
        id="user-select"
        [data]="users"
        [(ngModel)]="selectedUsers"
        [config]="{
          enableSearch: true,
          ariaLabel: 'User selection dropdown',
          ariaDescribedBy: 'user-select-help'
        }"
        placeholder="Choose users"
        required
      />
      
      <small id="user-select-help" class="help-text">
        Use arrow keys to navigate, Enter to select, Escape to close
      </small>
      
      @if (selectedUsers.length > 0) {
        <div role="status" aria-live="polite" aria-atomic="true">
          {{ selectedUsers.length }} user(s) selected
        </div>
      }
    </div>
  `
})
export class AccessibleDropdownComponent {
  users = ['Alice', 'Bob', 'Charlie', 'Diana'];
  selectedUsers = [];
}
```

## 📖 Common Patterns

### Dynamic Data Loading

```typescript
@Component({
  template: `
    <ngx-multiselect-dropdown
      [data]="items()"
      [config]="{ enableSearch: true }"
      [(ngModel)]="selection"
      (searchChange)="loadData($event)"
      placeholder="Type to search..."
    />
  `
})
export class DynamicDataComponent {
  items = signal<any[]>([]);
  selection = [];
  
  constructor(private dataService: DataService) {}
  
  loadData(searchTerm: string) {
    this.dataService.searchItems(searchTerm).subscribe(results => {
      this.items.set(results);
    });
  }
}
```

---

## 📚 More Resources

- [API Documentation](../README.md#api-reference)
- [Configuration Options](../README.md#configuration-options)
- [GitHub Repository](https://github.com/noble-wave/ngx-multiselect-dropdown)
- [StackBlitz Examples](https://stackblitz.com/@noble-wave/ngx-multiselect-dropdown)

**Need more examples? [Open an issue](https://github.com/noble-wave/ngx-multiselect-dropdown/issues) or contribute your own!**
