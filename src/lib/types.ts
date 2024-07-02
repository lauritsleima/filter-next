export type Filter = {
  filterId?: string;
  filterName: string;
  criteria: Criteria[];
};

export type Criteria = {
  id?: number;
  type: TypeEnum;
  comparison: Comparison;
  valueText: string | null;
  valueNumber: number | null;
  valueDate: string | null;
};

export enum Comparison {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GREATER = '>',
  GREATER_OR_EQUAL = '>=',
  LESS = '<',
  LESS_OR_EQUAL = '<=',
}

export enum TypeEnum {
  TEXT = 'TEXT',
  AMOUNT = 'AMOUNT',
  DATE = 'DATE',
}

export type ValueType = {
  text: string | null;
  number: number | null;
  date: string | null;
}
