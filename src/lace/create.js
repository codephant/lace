export default function lace_create () {
	return function laced () {
		laced.fn.apply(laced.ctx, arguments)
		return laced
	}
}
