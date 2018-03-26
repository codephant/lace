export const intoDescriptors = (mutators, descriptor) => Object.keys(mutators).reduce((descriptors, mkey) => (descriptors[mkey] = descriptor(mutators[mkey]),
    descriptors), {});
