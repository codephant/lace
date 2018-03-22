import { Mutator, Mutators } from "./mutator";
export const intoDescriptors = <T extends string>(
	mutators: Mutators<T>,
	descriptor: (m: Mutator) => PropertyDescriptor,
) =>
	Object.keys(mutators).reduce<PropertyDescriptorMap>(
		(descriptors, mkey) => (
			descriptors[mkey] = descriptor(mutators[mkey]),
			descriptors
		),
		{}
	)
