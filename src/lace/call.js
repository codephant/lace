const call_ = Function.prototype.call

export default function lace_call (thisArg) {
	call_.apply(this.fn, arguments)
	return this
}
