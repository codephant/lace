'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isKeyType = { string: true, symbol: true };

const resolveFn = (fn, ctx) => {
	if (typeof fn === "function") return fn;else {
		if (isKeyType[typeof fn]) {
			if (typeof ctx == null) {
				throw new TypeError("lace: can only use symbols and string for functions when context is given");
			}
			fn = ctx[fn];
		}
		if (typeof fn !== "function") {
			throw new TypeError("lace: can only lace function/methods; found: " + typeof fn);
		}

		return fn;
	}
};

const setContext = (lace, fn, ctx) => {
	if (typeof ctx !== "undefined") lace.ctx = ctx;
	lace.fn = resolveFn(fn, lace.ctx);
	return lace;
};

const lace = (fn, ctx) => {
	const lace = {
		fn: undefined, ctx: undefined,
		lacer: (...args) => (lace.fn.apply(lace.ctx, args), lace.lacer)
	};
	lace.lacer.lace = (fn, ctx) => setContext(lace, fn, ctx).lacer;
	return lace.lacer.lace(fn, ctx);
};

const noOp = () => {};

const laceFor = ctx => lace(noOp, ctx);

const intoDescriptors = (mutators, descriptor) => {
	const descriptors = {};
	for (const mkey of Object.keys(mutators)) {
		descriptors[mkey] = descriptor(mutators[mkey]);
	}
	return descriptors;
};

const lacingDescriptor = fn => ({ configurable: true, get() {
		return this.lace(fn);
	} });

const makeCreator = descriptors => ctx => Object.defineProperties(laceFor(ctx), descriptors);

const laceCreator = mutators => makeCreator(intoDescriptors(mutators, lacingDescriptor));

const customLacerKey = "$CustomLacer";

const makeLacerDescriptor = fn => ({
	configurable: true,
	get() {
		return (this[customLacerKey] || laceFor)(this).lace(fn);
	}
});

const defineLaceProperties = (obj, mutators) => (Object.defineProperty(obj, customLacerKey, {
	configurable: true,
	value: laceCreator(mutators)
}), Object.defineProperties(obj, intoDescriptors(mutators, makeLacerDescriptor)));

const defineLaceProperty = (obj, key, mutator) => Object.defineProperty(obj, key, makeLacerDescriptor(mutator));

exports.lace = lace;
exports.laceFor = laceFor;
exports.laceCreator = laceCreator;
exports.defineLaceProperty = defineLaceProperty;
exports.defineLaceProperties = defineLaceProperties;
