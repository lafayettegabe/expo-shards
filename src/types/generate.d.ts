interface ColumnDefinition {
  type: string;
  primary?: boolean;
  autoincrement?: boolean;
  unique?: boolean;
  default?: string;
  onUpdate?: boolean;
}

interface TableSchema {
  [tableName: string]: {
    [columnName: string]: ColumnDefinition;
  };
}
