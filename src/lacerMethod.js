import setByKey from "./setByKey"
import setFunc from "./set"
import lacerFor from "./lacerFor"
import LacerProp from "./customLacerProp"

const isKeyType = { string: true, symbol: true }

export default function lace_createLacerMethod (funcOrKey) {
	const set = isKeyType[typeof funcOrKey] ? setByKey : setFunc
	return function lace_lacerMethod () {
		const lacer = (this[LacerProp] || lacerFor)(this)
		set.call(lacer, funcOrKey)
		return lacer
	}
}