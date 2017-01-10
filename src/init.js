import lace_set from "./dynSet"

export default function lace_init (fn, ctx) {
	this.lace = lace_set
	lace_set.apply(this, arguments)
}
