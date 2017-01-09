export = lace;

/**
 * Creates a new function that passes all it's arguments to the *`mutator`*.
 * However it ignores the return value of *`mutator`* and returns itself.
 * This enables the chaining of calls to *`mutator`*.
 *
 * Optionally the calling context (`thisArg`) can be passed to lace, which will
 * then forward it to `mutator` with each call.
 *
 * ```js
 * const greeting = [];
 * lace(word => greeting.push(word))
 * ("hello")("world")("nice")("to")("meet")("you");
 * greeting.join(" ") === "hello world nice to meet you"; // true
 * ```
 */
declare function lace (mutator: Function, context?: Object): lace.Laced;

declare namespace lace {
	export interface Lacer {
		/**
		 * Call the currently set mutator.
		 */
		(...args: Array<any>): this;

		/**
		 * Call the currently set mutator with a given calling context.
		 */
		call (ctx: Object, ...args: Array<any>): this;

		/**
		 * Call the currently set mutator with a given calling context
		 * and argument list.
		 */
		apply (ctx: Object, args: ArrayLike<any>): this;

		/**
		 * Exchange the current mutator for a new one.
		 */
		lace (mutator: Function, context?: Object): this;
	}

	/**
	 * Creates a factory function that returns a customized lacing function (*lacer*)
	 * with *`mutators`* as its methods. This can be used to create *lacer*s, that are
	 * specialized in lacing method calls to a certain type/class.
	 *
	 * If the value of a *`mutators` `key`* is a function, then the very function is
	 * used for the laced calls. However if the value is a string, then the function
	 * is fetched from the calling context given to the *lacer* on instantiation.
	 *
	 * See this DOM example:
	 *
	 * ```js
	 * const domLacer = lace.derive(
	 *   { attribute: "setAttribute"
	 *   , listener: Element.prototype.addEventListener
	 *   }
	 * );
	 * domLacer(document.querySelector("div.my-fancy"))
	 *   .attribute
	 *   ("title", "some fancy title")
	 *   ("data-awesome", "fancy and awesome info")
	 *   .listener
	 *   ("click", ev => { console.log("my fancy was clicked") }
	 *   ("mouseout", ev => {
	 *     lace(console.log, console)
	 *     ("don't leave my fancy, consider this:")
	 *     (ev.target.dataset.awesome)
	 *   });
	 * ```
	 */
	export function derive (mutator: {[key: string]: Function}): CustomLacerCreator;

	export type CustomLacer = Lacer | {};

	export interface CustomLacerCreator {
		(ctx: Object): CustomLacer;
	}
}