import { computed, signal, Signal } from '@angular/core';
import { DropdownItem } from '../models';

/**
 * State management service for dropdown functionality using Angular Signals.
 * Handles selection state, filtering, and derived computations.
 */
export class DropdownStateService<T = any> {
  // Core state signals
  private readonly _items = signal<DropdownItem<T>[]>([]);
  private readonly _selectedIds = signal<Set<string | number>>(new Set());
  private readonly _searchTerm = signal<string>('');
  private readonly _isOpen = signal<boolean>(false);

  // Public read-only signals
  readonly items = this._items.asReadonly();
  readonly searchTerm = this._searchTerm.asReadonly();
  readonly isOpen = this._isOpen.asReadonly();

  // Computed signals
  readonly selectedItems: Signal<DropdownItem<T>[]> = computed(() => {
    const ids = this._selectedIds();
    return this._items().filter((item) => ids.has(item.id));
  });

  readonly selectedCount: Signal<number> = computed(() => this._selectedIds().size);

  readonly filteredItems: Signal<DropdownItem<T>[]> = computed(() => {
    const items = this._items();
    const term = this._searchTerm().toLowerCase().trim();

    if (!term) {
      return items;
    }

    return items.filter((item) => item.text.toLowerCase().includes(term));
  });

  readonly availableItems: Signal<DropdownItem<T>[]> = computed(() => {
    return this.filteredItems().filter((item) => !item.disabled);
  });

  readonly hasSelection: Signal<boolean> = computed(() => this._selectedIds().size > 0);

  readonly allSelected: Signal<boolean> = computed(() => {
    const available = this.availableItems();
    if (available.length === 0) return false;

    return available.every((item) => this._selectedIds().has(item.id));
  });

  readonly hasResults: Signal<boolean> = computed(() => this.filteredItems().length > 0);

  /**
   * Set the complete list of items
   */
  setItems(items: DropdownItem<T>[]): void {
    this._items.set(items);
  }

  /**
   * Set the selected item IDs
   */
  setSelection(ids: (string | number)[]): void {
    this._selectedIds.set(new Set(ids));
  }

  /**
   * Toggle selection of a single item
   */
  toggleItem(id: string | number): void {
    const current = new Set(this._selectedIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this._selectedIds.set(current);
  }

  /**
   * Select a single item (for single selection mode)
   */
  selectSingle(id: string | number): void {
    this._selectedIds.set(new Set([id]));
  }

  /**
   * Check if an item is selected
   */
  isSelected(id: string | number): boolean {
    return this._selectedIds().has(id);
  }

  /**
   * Select all available (non-disabled) items
   */
  selectAll(): void {
    const available = this.availableItems();
    const allIds = available.map((item) => item.id);
    this._selectedIds.set(new Set(allIds));
  }

  /**
   * Clear all selections
   */
  clearSelection(): void {
    this._selectedIds.set(new Set());
  }

  /**
   * Update search term
   */
  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
  }

  /**
   * Clear search term
   */
  clearSearch(): void {
    this._searchTerm.set('');
  }

  /**
   * Open the dropdown
   */
  open(): void {
    this._isOpen.set(true);
  }

  /**
   * Close the dropdown
   */
  close(): void {
    this._isOpen.set(false);
  }

  /**
   * Toggle dropdown open/close state
   */
  toggle(): void {
    this._isOpen.update((value) => !value);
  }

  /**
   * Get the current selection as an array of IDs
   */
  getSelectedIds(): (string | number)[] {
    return Array.from(this._selectedIds());
  }

  /**
   * Reset all state
   */
  reset(): void {
    this._items.set([]);
    this._selectedIds.set(new Set());
    this._searchTerm.set('');
    this._isOpen.set(false);
  }
}
