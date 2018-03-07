const isKeyType = { string: true, symbol: true }

const resolveFn = (fn, ctx) => {
	if (typeof fn === "function") return fn
	else {
		if (isKeyType[typeof fn]) {
			if (typeof ctx == null) {
				throw new TypeError("lace: can only use symbols and string for functions when context is given")
			}
			fn = ctx[fn]
		}
		if (typeof fn !== "function") {
			throw new TypeError("lace: can only lace function/methods; found: " + typeof fn)
		}

		return fn
	}
}

const setContext = (lace, fn, ctx) => {
	if (typeof ctx !== "undefined") lace.ctx = ctx
	lace.fn = resolveFn(fn, lace.ctx)
	return lace
}

export const lace = (fn, ctx) => {
	const lace =
		{
			fn: undefined, ctx: undefined,
			lacer: (...args) => (lace.fn.apply(lace.ctx, args), lace.lacer)
		}
	lace.lacer.lace = (fn, ctx) => setContext(lace, fn, ctx).lacer
	return lace.lacer.lace(fn, ctx)
}
