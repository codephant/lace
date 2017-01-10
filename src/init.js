import lace_set from "./dynSet"
import lace_call from "./call"
import lace_apply from "./apply"

export default function lace_init (fn, ctx) {
	this.lace = lace_set
	this.call = lace_call
	this.apply = lace_apply
	lace_set.apply(this, arguments)
}
