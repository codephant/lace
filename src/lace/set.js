export default function lace_set (fn, ctx) {
	this.fn = fn
	if (ctx !== void 0) this.ctx = ctx
	return this
}
