import { Mutator, Mutators } from "./mutator";
export const intoDescriptors: (m: Mutators, d: (m: Mutator) => PropertyDescriptor) => PropertyDescriptorMap
