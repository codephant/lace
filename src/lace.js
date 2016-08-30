import construct from "./lace/construct"
import derive from "./lace/derive"

function lace (ctx, fn) {
	return construct.apply(this, arguments)
}

lace.derive = derive

export default lace
