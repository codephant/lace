"use strict"

var describe = require("tape")
var lace = require("../lace")

describe("lace's call forwarding", function (ensure) {
	var i = 0
	function inc (a) { i+=a }
	lace(inc)(1)(2)(3)
	ensure.equals(i, 6, "it forwards each call's arguments")
	ensure.end()
})

describe("change of laced function", function (ensure) {
	var accu = 42
	function inc (a) { accu-=a }
	function cat (s) { accu+=String(s) }
	lace(inc)(1)(2)(3)
	.lace(cat)("a")("b")
	ensure.equals(accu, "36ab", "it uses a different function after re-lacing")
	ensure.end()
})

describe("handling of immediate call context", function (ensure) {
	var ctxs = [undefined, null, { Sentinel: true }]
	lace(function checkCtx () {
		var i = checkCtx.i | 0
		checkCtx.i = i+1
		ensure.equals(this, ctxs[i]
		, "it forwards the immediate call context: " + String(this)
		)
	})
	().call(ctxs[1]).call(ctxs[2])
	ensure.end()
})

describe("call context precedence", function (ensure) {
	var S1 = { Sentinel:true, no:1 }
	var S2 = { Sentinel:true, no:2 }
	lace(S1, function (expectedCtx) {
		ensure.equals(this, expectedCtx
		, "immediate context takes precedence"
		)
	})
	.call(S2, S2)
	ensure.end()
})

describe("derived lacer", function (ensure) {
	var S1 = { Sentinel:true, no:1 }
	var S2 = { Sentinel:true, no:2 }
	function setStyle (name, value) {
		this.style[name] = value
	}
	function appendChild (child) {
		if (!this.children) this.children = [child]
		else this.children.push(child)
	}
	var $lace = lace.derive({ style:setStyle, append:appendChild })
	var o = { style:{}, children:null }
	$lace(o)
	.style("display", "block")("color", "red")("font", "serif")
	.append(S1)(S2)

	ensure.deepEquals(o
	,	{ style:{ display:"block", color:"red", font:"serif" }
		, children:[ S1, S2 ]
		}
	, "applies functions from mutator object"
	)
	ensure.end()
})
