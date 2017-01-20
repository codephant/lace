import LacerProp from "./customLacerProp"
import newLacer from "./newLacer"

export default
function lace_defineCustomLacer (obj, mutators) {
	Object.defineProperty(obj, LacerProp
	, { configurable: true, value: newLacer(mutators) }
	)
}

