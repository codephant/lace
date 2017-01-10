import set from "./set"
import setByKey from "./setByKey"

export default function lace_dynamicSet (keyOrFn) {
	return (
		typeof keyOrFn === "string" || typeof keyOrFn === "symbol" ? setByKey : set
	).apply(this, arguments)
}