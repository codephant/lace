import { lace } from "../src/lace"

export default describe => {

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

}
