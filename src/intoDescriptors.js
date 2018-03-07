export const intoDescriptors = (mutators, descriptor) => {
	const descriptors = {}
	for (const mkey of Object.keys(mutators)) {
		descriptors[mkey] = descriptor(mutators[mkey])
	}
	return descriptors
}
