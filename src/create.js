export default function lace_create () {
	return function lacer () {
		lacer.fn.apply(lacer.ctx, arguments)
		return lacer
	}
}
