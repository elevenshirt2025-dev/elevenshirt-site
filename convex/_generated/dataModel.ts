// Shim mínimo de tipos
export type Id<TableName extends string = string> = string & { __table?: TableName };
export type Document<TableName extends string = string> = Record<string, unknown> & { _id?: Id<TableName> };
