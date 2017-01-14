import { lacerMethod } from ".."

export default describe => {

	describe("static lacing method", ensure => {
		const o = { cnt: 0, inc: function(n) { this.cnt += n } }
		try {
			// o.inc = lacerMethod(o.inc)
			// o.inc()(1)(2)(3)
			Object.defineProperty(o, "inc", { get: lacerMethod(o.inc) })
			o.inc(1)(2)(3)
		}
		catch (e) { ensure.error(e) }
		ensure.equals(o.cnt, 6, "forwarded all calls")
		ensure.end()
	})


	describe("dynamic lacing method", ensure => {
		const o =
		{ cnt: 0
		, op: null
		, inc (n) { this.cnt += n }
		, dec (n) { this.cnt -= n }
		}
		try {
			Object.defineProperty(o, "laceop", { get: lacerMethod("op") })
			o.op = o.inc
			o.laceop(1)(2)(3)
			ensure.equals(o.cnt, 6, "forwarded all calls before changing property")
			o.op = o.dec
			o.laceop(1)(2)(3)
			ensure.equals(o.cnt, 0, "forwarded all calls after changing property")
		}
		catch (e) { ensure.error(e) }
		ensure.end()
	})

}