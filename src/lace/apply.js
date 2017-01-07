const apply_ = Function.prototype.apply

export default function lace_apply (thisArg, argList) {
	apply_.apply(this.fn, arguments)
	return this
}
