'use strict';

function _interopDefault(ex) {
	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var describe = _interopDefault(require('tape'));
var __ = require('..');

var lace$1 = describe => {

	describe("lace's call forwarding", ensure => {
		let i = 0;
		function inc(a) {
			i += a;
		}
		__.lace(inc)(1)(2)(3);
		ensure.equals(i, 6, "it forwards each call's arguments");
		ensure.end();
	});

	describe("change of laced function", ensure => {
		let accu = 42;
		function inc(a) {
			accu -= a;
		}
		function cat(s) {
			accu += String(s);
		}
		__.lace(inc)(1)(2)(3).lace(cat)("a")("b");
		ensure.equals(accu, "36ab", "it uses a different function after re-lacing");
		ensure.end();
	});

	describe("lace's call context forwarding", ensure => {
		const Sentinel = { Sentinel: true };
		__.lace(function checkCtx(expectedCtx) {
			ensure.strictEquals(this, expectedCtx, "it forwards the call context");
		}, Sentinel)(Sentinel);
		ensure.end();
	});
};

const S1 = { Sentinel: true, no: 1 };
const S2 = { Sentinel: true, no: 2 };

const methods = {
	setStyle(name, value) {
		(this.style || (this.style = {}))[name] = value;
	},

	appendChild(child) {
		if (!this.children) this.children = [child];else this.children.push(child);
	}
};

var creator = describe => {

	describe("custom static lacer", ensure => {
		const $lace = __.laceCreator(methods);
		const o = { style: null, children: null };

		$lace(o).setStyle("display", "block")("color", "red")("font", "serif").appendChild(S1)(S2);

		ensure.deepEquals(o.style, { display: "block", color: "red", font: "serif" }, "applies style function calls");
		ensure.deepEquals(o.children, [S1, S2], "applies children function calls");
		ensure.end();
	});

	describe("custom dynamic lacer", ensure => {
		const $lace = __.laceCreator({ style: "setStyle", append: "appendChild" });
		const o = Object.assign({ style: null, children: null }, methods);

		$lace(o).style("display", "block")("color", "red")("font", "serif").append(S1)(S2);

		ensure.deepEquals(o.style, { display: "block", color: "red", font: "serif" }, "applies style function calls");
		ensure.deepEquals(o.children, [S1, S2], "applies children function calls");
		ensure.end();
	});
};

var define = describe => {

	describe("static lacing property", ensure => {
		const o = { cnt: 0, inc(n) {
				this.cnt += n;
			} };
		try {
			__.defineLaceProperty(o, "inc", o.inc);
			o.inc(1)(2)(3);
		} catch (e) {
			ensure.error(e);
		}
		ensure.equals(o.cnt, 6, "forwarded all calls");
		ensure.end();
	});

	describe("dynamic lacing property", ensure => {
		const o = { cnt: 0,
			op: null,
			inc(n) {
				this.cnt += n;
			},
			dec(n) {
				this.cnt -= n;
			}
		};
		try {
			__.defineLaceProperty(o, "laceop", "op");
			o.op = o.inc;
			o.laceop(1)(2)(3);
			ensure.equals(o.cnt, 6, "forwarded all calls before changing property");
			o.op = o.dec;
			o.laceop(1)(2)(3);
			ensure.equals(o.cnt, 0, "forwarded all calls after changing property");
		} catch (e) {
			ensure.error(e);
		}
		ensure.end();
	});

	describe("defineLacerProperties", ensure => {
		const o = { cnt: 0, inc(n) {
				return this.cnt += n | 0;
			} };
		__.defineLaceProperties(o, { laceInc: o.inc });
		ensure.ok("laceInc" in o, "property is assigned");
		o.laceInc(1)(2)(3);
		ensure.equals(o.cnt, 6, "forwarded calls to method");
		ensure.end();
	});
};

[lace$1, creator, define].forEach(t => t(describe));

