import construct from "./lace/construct"
import derive from "./lace/derive"

function lace (ctx, fn) {
	return construct.apply(this, arguments)
}

Object.defineProperties(lace
,	{ derive:{ value:derive }
	}
)

export default lace
