import {
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  forwardRef,
  DestroyRef,
  inject,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  DropdownItem,
  DropdownConfig,
  DEFAULT_DROPDOWN_CONFIG,
  DropdownFieldMapping,
} from '../../models';
import { DropdownStateService } from '../../services';
import { ClickOutsideDirective } from '../../directives';

/**
 * Modern Angular multiselect dropdown component using Signals and standalone architecture.
 *
 * @example
 * ```html
 * <ngx-multiselect-dropdown
 *   [data]="items"
 *   [config]="config"
 *   [(ngModel)]="selectedValues"
 *   (selectionChange)="onSelectionChange($event)"
 * />
 * ```
 */
@Component({
  selector: 'ngx-multiselect-dropdown',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './multiselect-dropdown.component.html',
  styleUrl: './multiselect-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectDropdownComponent),
      multi: true,
    },
  ],
  host: {
    '[class.ngx-dropdown-disabled]': 'disabled()',
    '[class.ngx-dropdown-open]': 'state.isOpen()',
  },
})
export class MultiselectDropdownComponent<T = any> implements ControlValueAccessor {
  private readonly destroyRef = inject(DestroyRef);

  // Input signals
  readonly data = input<T[]>([]);
  readonly config = input<DropdownConfig>({});
  readonly placeholder = input<string>('Select');
  readonly disabled = input<boolean>(false);

  // Output events
  readonly selectionChange = output<DropdownItem<T>[]>();
  readonly dropdownOpen = output<void>();
  readonly dropdownClose = output<void>();
  readonly searchChange = output<string>();

  // Internal state
  protected readonly state = new DropdownStateService<T>();
  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};
  protected _focusedIndex = signal<number>(-1);

  // Merged configuration
  protected readonly mergedConfig = computed(() => ({
    ...DEFAULT_DROPDOWN_CONFIG,
    ...this.config(),
    fieldMapping: {
      ...DEFAULT_DROPDOWN_CONFIG.fieldMapping,
      ...this.config().fieldMapping,
    },
  }));

  // Display text for the trigger button
  protected readonly displayText = computed(() => {
    const selected = this.state.selectedItems();
    const limit = this.mergedConfig().displayLimit;

    if (selected.length === 0) {
      return this.placeholder();
    }

    if (selected.length <= limit) {
      return selected.map((item) => item.text).join(', ');
    }

    const visible = selected.slice(0, limit).map((item) => item.text).join(', ');
    const remaining = selected.length - limit;
    return `${visible} (+${remaining} more)`;
  });

  // Show "Select All" checkbox
  protected readonly showSelectAll = computed(() => {
    const config = this.mergedConfig();
    return config.enableSelectAll && !config.singleSelection;
  });

  constructor() {
    // Convert input data to DropdownItems when data changes
    effect(
      () => {
        const rawData = this.data();
        const mapping = this.mergedConfig().fieldMapping;
        const items = this.transformDataToItems(rawData, mapping);
        this.state.setItems(items);
      },
      { allowSignalWrites: true }
    );

    // Sync selection changes to form control
    effect(() => {
      const selected = this.state.selectedItems();
      const value = this.transformItemsToValue(selected, this.mergedConfig().singleSelection);
      this._onChange(value);
    });

    // Emit selection changes
    effect(() => {
      const selected = this.state.selectedItems();
      this.selectionChange.emit(selected);
    });

    // Emit open/close events
    effect(() => {
      if (this.state.isOpen()) {
        this.dropdownOpen.emit();
      } else {
        this.dropdownClose.emit();
        if (this.mergedConfig().clearSearchOnClose) {
          this.state.clearSearch();
        }
      }
    });
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (!value) {
      this.state.clearSelection();
      return;
    }

    const config = this.mergedConfig();
    const ids = this.extractIdsFromValue(value, config.fieldMapping);
    this.state.setSelection(ids);
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Note: using input signal, so external changes handled automatically
  }

  // Public API methods
  protected toggleDropdown(): void {
    if (this.disabled()) return;
    this.state.toggle();
    if (!this.state.isOpen()) {
      this._onTouched();
    }
  }

  protected handleItemClick(item: DropdownItem<T>): void {
    if (item.disabled || this.disabled()) return;

    const config = this.mergedConfig();

    if (config.singleSelection) {
      this.state.selectSingle(item.id);
      if (config.closeOnSelect) {
        this.state.close();
      }
    } else {
      // Check selection limit
      if (
        config.selectionLimit > 0 &&
        !this.state.isSelected(item.id) &&
        this.state.selectedCount() >= config.selectionLimit
      ) {
        return; // Limit reached
      }

      this.state.toggleItem(item.id);
      if (config.closeOnSelect) {
        this.state.close();
      }
    }

    this._onTouched();
  }

  protected handleSelectAll(): void {
    if (this.state.allSelected()) {
      this.state.clearSelection();
    } else {
      this.state.selectAll();
    }
    this._onTouched();
  }

  protected handleSearchInput(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.state.setSearchTerm(term);
    this.searchChange.emit(term);
  }

  protected clearSelection(): void {
    this.state.clearSelection();
    this._onTouched();
  }

  protected handleClickOutside(): void {
    if (this.state.isOpen()) {
      this.state.close();
      this._onTouched();
    }
  }

  // Keyboard navigation
  @HostListener('keydown', ['$event'])
  protected handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!this.state.isOpen()) {
          event.preventDefault();
          this.state.open();
        } else if (this._focusedIndex() >= 0) {
          event.preventDefault();
          const items = this.state.filteredItems();
          const item = items[this._focusedIndex()];
          if (item) {
            this.handleItemClick(item);
          }
        }
        break;

      case 'Escape':
        if (this.state.isOpen()) {
          event.preventDefault();
          this.state.close();
          this._onTouched();
        }
        break;

      case 'ArrowDown':
        if (this.state.isOpen()) {
          event.preventDefault();
          this.moveFocus(1);
        } else {
          this.state.open();
        }
        break;

      case 'ArrowUp':
        if (this.state.isOpen()) {
          event.preventDefault();
          this.moveFocus(-1);
        }
        break;

      case 'Home':
        if (this.state.isOpen()) {
          event.preventDefault();
          this._focusedIndex.set(0);
        }
        break;

      case 'End':
        if (this.state.isOpen()) {
          event.preventDefault();
          const items = this.state.filteredItems();
          this._focusedIndex.set(items.length - 1);
        }
        break;
    }
  }

  private moveFocus(direction: 1 | -1): void {
    const items = this.state.filteredItems();
    if (items.length === 0) return;

    let newIndex = this._focusedIndex() + direction;

    // Wrap around
    if (newIndex < 0) {
      newIndex = items.length - 1;
    } else if (newIndex >= items.length) {
      newIndex = 0;
    }

    // Skip disabled items
    let attempts = 0;
    while (items[newIndex]?.disabled && attempts < items.length) {
      newIndex += direction;
      if (newIndex < 0) newIndex = items.length - 1;
      if (newIndex >= items.length) newIndex = 0;
      attempts++;
    }

    this._focusedIndex.set(newIndex);
  }

  // Helper methods
  private transformDataToItems(data: T[], mapping: DropdownFieldMapping): DropdownItem<T>[] {
    return data.map((item) => {
      // Handle primitive types
      if (typeof item === 'string' || typeof item === 'number') {
        return {
          id: item,
          text: String(item),
          disabled: false,
          data: item,
        };
      }

      // Handle objects
      const obj = item as any;
      return {
        id: obj[mapping.idField],
        text: String(obj[mapping.textField]),
        disabled: Boolean(obj[mapping.disabledField]),
        data: item,
      };
    });
  }

  private extractIdsFromValue(value: any, mapping: DropdownFieldMapping): (string | number)[] {
    if (Array.isArray(value)) {
      return value.map((item) => {
        if (typeof item === 'string' || typeof item === 'number') {
          return item;
        }
        return item[mapping.idField];
      });
    }

    // Single value
    if (typeof value === 'string' || typeof value === 'number') {
      return [value];
    }

    return [value[mapping.idField]];
  }

  private transformItemsToValue(items: DropdownItem<T>[], singleSelection: boolean): any {
    if (items.length === 0) {
      return singleSelection ? null : [];
    }

    const values = items.map((item) => item.data);
    return singleSelection ? values[0] : values;
  }

  // TODO: Add keyboard navigation (Arrow keys, Enter, Escape)
  // NOTE: Keyboard navigation implemented - supports Arrow keys, Enter, Space, Escape, Home, End
  // TODO: Add unit tests for component logic
  // TODO: Add integration tests for forms
}
