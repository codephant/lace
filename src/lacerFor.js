import lacer from "./lacer"
import noop from "./noop"

export default function lace_lacerFor (context) {
	return lacer(noop, context)
}