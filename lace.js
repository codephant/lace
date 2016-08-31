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

var call_ = Function.prototype.call

function lace_call () {
	call_.apply(this.fn, arguments)
	return this
}

var apply_ = Function.prototype.apply

function lace_apply () {
	apply_.apply(this.fn, arguments)
	return this
}

function lace_init (ctx, fn) {
	if (fn === undefined) fn = ctx, ctx = undefined
	this.lace = lace_set
	this.call = lace_call
	this.apply = lace_apply
	this.lace(fn)
	if (typeof(ctx) !== "undefined") this.ctx = ctx
}

function lace_construct (ctx, fn) {
	var laced = lace_create()
	lace_init.apply(laced, arguments)
	return laced
}

function lace_createBoundSet (fn)  {
	return function lace_boundSet () {
		return lace_set.call(this, fn)
	}
}

function noop () {}

function lace_derive (mutators) {
	function lace_constructor (ctx) {
		var laced = lace_construct(ctx, noop)
		var k
		for (k in mutators) if (!mutators.hasOwnProperty(k)) break; else {
			Object.defineProperty(laced, k
			, { configurable:true, get:lace_createBoundSet(mutators[k]) }
			)
		}
		return laced
	}
	return lace_constructor
}

function lace (ctx, fn) {
	return lace_construct.apply(this, arguments)
}

lace.derive = lace_derive

return lace;

})));