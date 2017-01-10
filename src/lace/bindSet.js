import lace_set from "./set"

export default function lace_bindSet (fn)  {
	return typeof(fn) === "string" || typeof(fn) === "symbol"
	?	function lace_boundDynamSet () {
			return lace_set.call(this, this.ctx[fn])
		}
	:	function lace_boundStaticSet () {
			return lace_set.call(this, fn)
		}
}
