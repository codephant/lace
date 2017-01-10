const apply_ = Function.prototype.apply

export default function lace_apply (thisArg, argList) {
	this.ctx = thisArg
	apply_.apply(this.fn, arguments)
	return this
}
