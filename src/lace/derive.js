import lace_construct from "./construct"
import lace_createBoundSet from "./createBoundSet"

function noop () {}

export default function lace_derive (mutators) {
	function lace_constructor (ctx) {
		const laced = lace_construct(ctx, noop)
		for (let k in mutators) if (!mutators.hasOwnProperty(k)) break; else {
			Object.defineProperty(laced, k
			, { configurable:true, get:lace_createBoundSet(mutators[k]) }
			)
		}
		return laced
	}
	return lace_constructor
}
