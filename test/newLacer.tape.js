import { newLacer } from ".."

const S1 = { Sentinel:true, no:1 }
const S2 = { Sentinel:true, no:2 }

const setStyle = function (name, value) {
	this.style[name] = value
}

const appendChild = function (child) {
	if (!this.children) this.children = [child]
	else this.children.push(child)
}

export default describe => {

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
