import lace_set from "./set"
import lace_call from "./call"
import lace_apply from "./apply"

export default function lace_init (ctx, fn) {
	if (fn === void 0) fn = ctx, ctx = void 0
	this.lace = lace_set
	this.call = lace_call
	this.apply = lace_apply
	this.lace(fn)
	if (ctx !== void 0) this.ctx = ctx
}
