import lace_set from "./set"

export default function lace_init (ctx, fn) {
	if (fn === undefined) fn = ctx, ctx = undefined
	this.lace = lace_set
	this.lace(fn)
	if (typeof(ctx) !== "undefined") this.ctx = ctx
}
