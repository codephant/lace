import { defineLacerProperties } from ".."
import LacerProp from "../src/customLacerProp"

export default describe => {
	describe("defineLacerProperties", ensure => {
		const o = { cnt: 0, inc (n) { return this.cnt += (n | 0) } }
		defineLacerProperties(o, {laceInc: o.inc })
		ensure.ok("laceInc" in o, "property is assigned")
		o.laceInc(1)(2)(3)
		ensure.equals(o.cnt, 6, "forwarded calls to method")
		ensure.end()
	})
}