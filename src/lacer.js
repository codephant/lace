import lace_create from "./create"
import lace_init from "./init"

export default function lace_lacer (fn, ctx) {
	const lacer = lace_create()
	lace_init.apply(lacer, arguments)
	return lacer
}
