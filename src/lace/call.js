const call_ = Function.prototype.call

export default function lace_call (thisArg) {
	this.ctx = thisArg
	call_.apply(this.fn, arguments)
	return this
}
