import { laceCreator } from "../index"

const S1 = { Sentinel:true, no:1 }
const S2 = { Sentinel:true, no:2 }

const methods = {
	setStyle(name, value) {
		(this.style || (this.style = {}))[name] = value
	},

	appendChild(child) {
		if (!this.children) this.children = [child]
		else this.children.push(child)
	},
}

export default describe => {

	describe("custom static lacer", ensure => {
		const $lace = laceCreator(methods)
		const o = { style:null, children:null }

		$lace(o)
		.setStyle("display", "block")("color", "red")("font", "serif")
		.appendChild(S1)(S2)

		ensure.deepEquals(o.style, { display:"block", color:"red", font:"serif" }
		, "applies style function calls"
		)
		ensure.deepEquals(o.children, [ S1, S2 ]
		, "applies children function calls"
		)
		ensure.end()
	})

	describe("custom dynamic lacer", ensure => {
		const $lace = laceCreator({ style:"setStyle", append:"appendChild" })
		const o = Object.assign({ style:null, children:null }, methods)

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
