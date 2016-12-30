const apply_ = Function.prototype.apply

export default function lace_apply () {
	apply_.apply(this.fn, arguments)
	return this
}
