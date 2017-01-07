import lace_construct from "./construct"
import lace_createBoundSet from "./createBoundSet"

function noop () {}

export default function lace_derive (mutators) {
	function lace_creator (ctx) {
		const laced = lace_construct(noop, ctx)
		for (let k in mutators) if (!mutators.hasOwnProperty(k)) break; else {
			Object.defineProperty(laced, k
			, { configurable:true, get:lace_createBoundSet(mutators[k]) }
			)
		}
		return laced
	}
	return lace_creator
}
