import lace_create from "./create"
import lace_init from "./init"

export default function lace_construct (ctx, fn) {
	var laced = lace_create()
	lace_init.apply(laced, arguments)
	return laced
}
