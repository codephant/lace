import { laceFor } from "./laceFor"
import { intoDescriptors } from "./intoDescriptors"

const lacingDescriptor = (fn) => ({ configurable: true, get() { return this.lace(fn) } })

const makeCreator = (descriptors) =>
	(ctx) => Object.defineProperties(laceFor(ctx), descriptors)

export const laceCreator = (mutators) =>
	makeCreator(intoDescriptors(mutators, lacingDescriptor))
