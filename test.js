var describe = require("tape")
var lace = require("./lace")

describe("lace's call forwarding", function (ensure) {
	var i = 0
	function inc (a) { i+=a }
	lace(inc)(1)(2)(3)
	ensure.equals(i, 6)
	ensure.end()
})

describe("change of laced function", function (ensure) {
	var accu = 42
	function inc (a) { accu-=a }
	function cat (s) { accu+=String(s) }
	lace(inc)(1)(2)(3)
	.lace(cat)("a")("b")
	ensure.equals(accu, "36ab")
	ensure.end()
})
