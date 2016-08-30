(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.lace = factory());
}(this, (function () { 'use strict';

function lace_create () {
	return function laced () {
		laced.fn.apply(laced.ctx, arguments)
		return laced
	}
}

function lace_set (fn) {
	this.fn = fn
	return this
}

function lace_init (ctx, fn) {
	if (fn === undefined) fn = ctx, ctx = undefined
	this.lace = lace_set
	this.lace(fn)
	if (typeof(ctx) !== "undefined") this.ctx = ctx
}

function lace_construct (ctx, fn) {
	var laced = lace_create()
	lace_init.apply(laced, arguments)
	return laced
}

return lace_construct;

})));