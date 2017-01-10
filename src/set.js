export default function lace_set (fn, ctx) {
	this.fn = fn
	if (arguments.length > 1) this.ctx = ctx
	return this
}
