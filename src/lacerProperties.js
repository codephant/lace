import lacerMethod from "./lacerMethod"
import defMappedProps from "./defMappedProps"
import defCustomLacer from "./defCustomLacer"

function laceDescToPropDesc (ldesc) {
	return { configurable: true, get: lacerMethod(ldesc) }
}

export default
function lace_defineLacerProperties (obj, mutators) {
	defCustomLacer(obj, mutators)
	return defMappedProps(obj, mutators, laceDescToPropDesc)
}
