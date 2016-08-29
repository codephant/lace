module.exports =
(function makeLace () { "use strict"
	var exports = lace

	function create_laced () {
			var laced =
			function laced () { laced.fn.apply(this, arguments); return laced }
			laced.lace = lace
			return laced
	}

	function lace (fn) {
		var laced = (typeof(this) === "function" && this.name === "laced")
		?	this
		:	create_laced()

		laced.fn = fn
		return laced
	}

	return exports
})()
