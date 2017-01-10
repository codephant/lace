import describe from "tape"
import { lace, newLacer } from ".."

describe("lace's call forwarding", ensure => {
	let i = 0
	function inc (a) { i+=a }
	lace(inc)(1)(2)(3)
	ensure.equals(i, 6, "it forwards each call's arguments")
	ensure.end()
})

describe("change of laced function", ensure => {
	let accu = 42
	function inc (a) { accu-=a }
	function cat (s) { accu+=String(s) }
	lace(inc)(1)(2)(3)
	.lace(cat)("a")("b")
	ensure.equals(accu, "36ab", "it uses a different function after re-lacing")
	ensure.end()
})

describe("lace's call context forwarding", ensure => {
	const Sentinel = { Sentinel: true }
	lace
	(	function checkCtx (expectedCtx) {
			ensure.strictEquals(this, expectedCtx, "it forwards the call context")
		}
	, Sentinel
	)(Sentinel)
	ensure.end()
})

{
	const S1 = { Sentinel:true, no:1 }
	const S2 = { Sentinel:true, no:2 }

	const setStyle = function (name, value) {
		this.style[name] = value
	}

	const appendChild = function (child) {
		if (!this.children) this.children = [child]
		else this.children.push(child)
	}

	describe("custom static lacer", ensure => {
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

	describe("custom dynamic lacer", ensure => {
		const $lace = newLacer({ style:"setStyle", append:"appendChild" })
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
}
