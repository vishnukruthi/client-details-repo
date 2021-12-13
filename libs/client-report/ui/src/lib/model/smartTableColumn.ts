/**
 * A model to define columns of smart table
 */
export interface SmartTableColumn {
  /**
   * The text to display for the column header
   */
  header?: string;
  /**
   * The field name that should be picked from data object
   */
  field?: string;
}
