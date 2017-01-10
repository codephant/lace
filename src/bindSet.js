import lace_set from "./set"
import lace_setByKey from "./setByKey"

export default function lace_bindSet (fn)  {
	const set = typeof(fn) === "string" || typeof(fn) === "symbol"
	? lace_setByKey : lace_set

	return function lace_boundSet () {
		return set.call(this, fn)
	}
}
