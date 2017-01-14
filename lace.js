'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function lace_create() {
	return function lacer() {
		lacer.fn.apply(lacer.ctx, arguments);
		return lacer;
	};
}

function lace_set(fn, ctx) {
	this.fn = fn;
	if (arguments.length > 1) this.ctx = ctx;
	return this;
}

function lace_setByKey(key, ctx) {
	const withCtx = arguments.length > 1;
	ctx = withCtx ? ctx : this.ctx;

	if (ctx == null) throw new TypeError("cannot lace by key without context");

	const fn = ctx[key];
	if (typeof fn !== "function") throw new TypeError("can only lace functions");

	return withCtx ? lace_set.call(this, fn, ctx) : lace_set.call(this, fn);
}

function lace_dynamicSet(keyOrFn) {
	return (typeof keyOrFn === "string" || typeof keyOrFn === "symbol" ? lace_setByKey : lace_set).apply(this, arguments);
}

function lace_init(fn, ctx) {
	this.lace = lace_dynamicSet;
	lace_dynamicSet.apply(this, arguments);
}

function lace_lacer(fn, ctx) {
	const lacer = lace_create();
	lace_init.apply(lacer, arguments);
	return lacer;
}

var noop = () => {};

function lace_lacerFor(context) {
	return lace_lacer(noop, context);
}

function lace_bindSet(fn) {
	const set = typeof fn === "string" || typeof fn === "symbol" ? lace_setByKey : lace_set;

	return function lace_boundSet() {
		return set.call(this, fn);
	};
}

function lace_newLacer(mutators) {
	function lace_customLacer(ctx) {
		const lacer = lace_lacerFor(ctx);
		for (let k in mutators) if (!mutators.hasOwnProperty(k)) break;else {
			Object.defineProperty(lacer, k, { configurable: true, get: lace_bindSet(mutators[k]) });
		}
		return lacer;
	}
	return lace_customLacer;
}

var LacerProp = "_customLacer";

const isKeyType = { string: true, symbol: true };

function lace_createLacerMethod(funcOrKey) {
	const set = isKeyType[typeof funcOrKey] ? lace_setByKey : lace_set;
	return function lace_lacerMethod() {
		const lacer = (this[LacerProp] || lace_lacerFor)(this);
		set.call(lacer, funcOrKey);
		return lacer;
	};
}

exports['default'] = lace_lacer;
exports.lace = lace_lacer;
exports.newLacer = lace_newLacer;
exports.lacerFor = lace_lacerFor;
exports.lacerMethod = lace_createLacerMethod;
