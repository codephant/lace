import lace_set from "./set"

export default function lace_createBoundSet (fn)  {
	return function lace_boundSet () {
		return lace_set.call(this, fn)
	}
}
