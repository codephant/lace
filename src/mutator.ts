export type Mutator = Function | string | symbol;

export type Mutators<K extends string> = Record<K, Mutator>;
