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
	if (ctx !== void 0) this.ctx = ctx;
	return this;
}

const call_ = Function.prototype.call;

function lace_call(thisArg) {
	this.ctx = thisArg;
	call_.apply(this.fn, arguments);
	return this;
}

const apply_ = Function.prototype.apply;

function lace_apply(thisArg, argList) {
	this.ctx = thisArg;
	apply_.apply(this.fn, arguments);
	return this;
}

function lace_init(fn, ctx) {
	this.lace = lace_set;
	this.call = lace_call;
	this.apply = lace_apply;
	this.lace(fn, ctx);
}

function lace_construct(fn, ctx) {
	const laced = lace_create();
	lace_init.apply(laced, arguments);
	return laced;
}

function lace_bindSet(fn) {
	return typeof fn === "string" || typeof fn === "symbol" ? function lace_boundDynamSet() {
		return lace_set.call(this, this.ctx[fn]);
	} : function lace_boundStaticSet() {
		return lace_set.call(this, fn);
	};
}

function noop() {}

function lace_newLacer(mutators) {
	function lace_customLacer(ctx) {
		const lacer = lace_construct(noop, ctx);
		for (let k in mutators) if (!mutators.hasOwnProperty(k)) break;else {
			Object.defineProperty(lacer, k, { configurable: true, get: lace_bindSet(mutators[k]) });
		}
		return lacer;
	}
	return lace_customLacer;
}

exports['default'] = lace_construct;
exports.lace = lace_construct;
exports.newLacer = lace_newLacer;
