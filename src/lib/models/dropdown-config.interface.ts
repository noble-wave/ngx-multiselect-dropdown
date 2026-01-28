import { DropdownFieldMapping } from './dropdown-item.interface';

/**
 * Configuration options for the multiselect dropdown component
 */
export interface DropdownConfig {
  /**
   * Enable single selection mode instead of multi-select
   * @default false
   */
  singleSelection?: boolean;

  /**
   * Field mapping configuration for custom data structures
   */
  fieldMapping?: Partial<DropdownFieldMapping>;

  /**
   * Show "Select All" / "Unselect All" checkbox
   * @default true
   */
  enableSelectAll?: boolean;

  /**
   * Text for "Select All" action
   * @default 'Select All'
   */
  selectAllText?: string;

  /**
   * Text for "Unselect All" action
   * @default 'Unselect All'
   */
  unselectAllText?: string;

  /**
   * Enable search/filter functionality
   * @default false
   */
  enableSearch?: boolean;

  /**
   * Placeholder text for search input
   * @default 'Search...'
   */
  searchPlaceholder?: string;

  /**
   * Clear search filter when dropdown closes
   * @default true
   */
  clearSearchOnClose?: boolean;

  /**
   * Maximum number of items that can be selected (-1 for unlimited)
   * @default -1
   */
  selectionLimit?: number;

  /**
   * Maximum number of selected items to display before showing "+X more"
   * @default 3
   */
  displayLimit?: number;

  /**
   * Close dropdown automatically after selection
   * @default false
   */
  closeOnSelect?: boolean;

  /**
   * Show selected items at the top of the list
   * @default false
   */
  showSelectedAtTop?: boolean;

  /**
   * Maximum height of the dropdown list in pixels
   * @default 300
   */
  maxHeight?: number;

  /**
   * Message to display when no data is available
   * @default 'No items available'
   */
  noDataText?: string;

  /**
   * Message to display when search returns no results
   * @default 'No results found'
   */
  noResultsText?: string;
}

/**
 * Default configuration values
 */
export const DEFAULT_DROPDOWN_CONFIG: Required<
  Omit<DropdownConfig, 'fieldMapping'> & { fieldMapping: DropdownFieldMapping }
> = {
  singleSelection: false,
  fieldMapping: {
    idField: 'id',
    textField: 'text',
    disabledField: 'disabled',
  },
  enableSelectAll: true,
  selectAllText: 'Select All',
  unselectAllText: 'Unselect All',
  enableSearch: false,
  searchPlaceholder: 'Search...',
  clearSearchOnClose: true,
  selectionLimit: -1,
  displayLimit: 3,
  closeOnSelect: false,
  showSelectedAtTop: false,
  maxHeight: 300,
  noDataText: 'No items available',
  noResultsText: 'No results found',
};
