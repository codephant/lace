import set from "./set"

export default function lace_setByKey (key, ctx) {
	const withCtx = arguments.length > 1
	ctx = withCtx ? ctx : this.ctx

	if (ctx == null) throw new TypeError("cannot lace by key without context")

	const fn = ctx[key]
	if (typeof fn !== "function") throw new TypeError("can only lace functions")

	return withCtx
	? set.call(this, fn, ctx)
	: set.call(this, fn)
}