
import { laceFor } from "./laceFor"
import { laceCreator } from "./laceCreator"
import { intoDescriptors } from "./intoDescriptors"

const customLacerKey = "$CustomLacer"

const makeLacerDescriptor = (fn) => ({
	configurable: true,
	get() {
		return (this[customLacerKey] || laceFor)(this).lace(fn)
	}
})

export const defineLaceProperties = (obj, mutators) => (
	Object.defineProperty(obj, customLacerKey, {
		configurable: true,
		value: laceCreator(mutators)
	}),
	Object.defineProperties(obj,
		intoDescriptors(mutators, makeLacerDescriptor)
	)
)

export const defineLaceProperty = (obj, key, mutator) =>
	Object.defineProperty(obj, key, makeLacerDescriptor(mutator))

