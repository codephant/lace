const owns = Object.prototype.hasOwnProperty

export default
function lace_defMappedProps (obj, descriptors, map) {
	for (let k in descriptors) if (!owns.call(descriptors, k)) break; else {
		Object.defineProperty(obj, k, map(descriptors[k]))
	}
	return obj
}