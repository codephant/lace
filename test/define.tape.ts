import { defineLaceProperties, defineLaceProperty } from "../src/define"

export default describe => {

	describe("static lacing property", ensure => {
		try {
			const o = defineLaceProperty(
				{ cnt: 0 }, "inc", function inc(n) { this.cnt += n }
			)
			o.inc(1)(2)(3)
			ensure.equals(o.cnt, 6, "forwarded all calls")
		}
		catch (e) { ensure.error(e) }
		ensure.end()
	})


	describe("dynamic lacing property", ensure => {
		const o =
		{ cnt: 0
		, op: null
		, inc (n) { this.cnt += n }
		, dec (n) { this.cnt -= n }
		}
		try {
			defineLaceProperty(o, "laceop", "op")
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

	describe("defineLacerProperties", ensure => {
		const o = defineLaceProperties(
				{ cnt: 0, inc (n) { return this.cnt += (n | 0) } },
				{ laceInc: "inc" }
		)
		ensure.ok("laceInc" in o, "property is assigned")
		o.laceInc(1)(2)(3)
		ensure.equals(o.cnt, 6, "forwarded calls to method")
		ensure.end()
	})
}
