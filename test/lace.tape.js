const describe = require("tape")
const { lace, newLacer } = require("./lace")

describe("lace's call forwarding", function (ensure) {
	let i = 0
	function inc (a) { i+=a }
	lace(inc)(1)(2)(3)
	ensure.equals(i, 6, "it forwards each call's arguments")
	ensure.end()
})

describe("change of laced function", function (ensure) {
	let accu = 42
	function inc (a) { accu-=a }
	function cat (s) { accu+=String(s) }
	lace(inc)(1)(2)(3)
	.lace(cat)("a")("b")
	ensure.equals(accu, "36ab", "it uses a different function after re-lacing")
	ensure.end()
})

describe("handling of immediate call context", function (ensure) {
	const ctxs = [undefined, null, { Sentinel: true }]
	lace(function checkCtx () {
		const i = checkCtx.i | 0
		checkCtx.i = i+1
		ensure.equals(this, ctxs[i]
		, "it forwards the immediate call context: " + String(this)
		)
	})
	().call(ctxs[1]).apply(ctxs[2], [])
	ensure.end()
})

describe("call context precedence", function (ensure) {
	const S1 = { Sentinel:true, no:1 }
	const S2 = { Sentinel:true, no:2 }
	lace
	(	function (expectedCtx) {
			ensure.equals(this, expectedCtx
			, "immediate context takes precedence"
			)
		}
	, S1
	)
	.call(S2, S2)
	ensure.end()
})

describe("custom static lacer", function (ensure) {
	const S1 = { Sentinel:true, no:1 }
	const S2 = { Sentinel:true, no:2 }
	function setStyle (name, value) {
		this.style[name] = value
	}
	function appendChild (child) {
		if (!this.children) this.children = [child]
		else this.children.push(child)
	}
	const $lace = newLacer({ style:setStyle, append:appendChild })
	const o = { style:{}, children:null }
	$lace(o)
	.style("display", "block")("color", "red")("font", "serif")
	.append(S1)(S2)

	ensure.deepEquals(o.style, { display:"block", color:"red", font:"serif" }
	, "applies style function calls"
	)
	ensure.deepEquals(o.children, [ S1, S2 ]
	, "applies children function calls"
	)
	ensure.end()
})

describe("derived dynamic lacer", function (ensure) {
	const S1 = { Sentinel:true, no:1 }
	const S2 = { Sentinel:true, no:2 }
	function setStyle (name, value) {
		this.style[name] = value
	}
	function appendChild (child) {
		if (!this.children) this.children = [child]
		else this.children.push(child)
	}
	const $lace = lace.derive({ style:"setStyle", append:"appendChild" })
	const o = { style:{}, children:null, setStyle:setStyle, appendChild:appendChild }
	$lace(o)
	.style("display", "block")("color", "red")("font", "serif")
	.append(S1)(S2)

	ensure.deepEquals(o.style, { display:"block", color:"red", font:"serif" }
	, "applies style function calls"
	)
	ensure.deepEquals(o.children, [ S1, S2 ]
	, "applies children function calls"
	)
	ensure.end()
})
