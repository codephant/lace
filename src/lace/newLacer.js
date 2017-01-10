import lace_construct from "./construct"
import bindSet from "./bindSet"

function noop () {}

export default function lace_newLacer (mutators) {
	function lace_customLacer (ctx) {
		const lacer = lace_construct(noop, ctx)
		for (let k in mutators) if (!mutators.hasOwnProperty(k)) break; else {
			Object.defineProperty(lacer, k
			, { configurable:true, get:bindSet(mutators[k]) }
			)
		}
		return lacer
	}
	return lace_customLacer
}
