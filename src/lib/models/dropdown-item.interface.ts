/**
 * Represents an item in the dropdown list.
 * Can be used with any data type via generic typing.
 */
export interface DropdownItem<T = any> {
  /**
   * Unique identifier for the item
   */
  id: string | number;

  /**
   * Display text for the item
   */
  text: string;

  /**
   * Whether the item is disabled and cannot be selected
   */
  disabled?: boolean;

  /**
   * Original source data
   */
  data?: T;
}

/**
 * Configuration for mapping source data to DropdownItem
 */
export interface DropdownFieldMapping {
  /**
   * Field name to use as the item's id
   * @default 'id'
   */
  idField: string;

  /**
   * Field name to use as the item's display text
   * @default 'text'
   */
  textField: string;

  /**
   * Field name to check if item is disabled
   * @default 'disabled'
   */
  disabledField: string;
}
