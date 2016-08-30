var call_ = Function.prototype.call

export default function lace_call () {
	call_.apply(this.fn, arguments)
	return this
}
