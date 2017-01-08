export = lace;

declare function lace (mutator: Function, context?: Object): lace.Laced;

declare namespace lace {
	export interface Lacer {
		/**
		 * Call the currently set mutator.
		 *
		 * @returns {this}
		 */
		(...args: Array<any>): this;

		/**
		 * Call the currently set mutator with a given calling context.
		 *
		 * @returns {this}
		 */
		call (ctx: Object, ...args: Array<any>): this;

		/**
		 * Call the currently set mutator with a given calling context
		 * and argument list.
		 *
		 * @returns {this}
		 */
		apply (ctx: Object, args: ArrayLike<any>): this;

		/**
		 * Exchange the current mutator for a new one.
		 *
		 * @param mutator the following chain of calls will be forwarded to this
		 * function.
		 *
		 * @returns {this}
		 */
		lace (mutator: Function, context?: Object): this;
	}

	export function derive (mutator: {[key: string]: Function}): CustomLacerCreator;

	export type CustomLacer = Lacer | {};

	export interface CustomLacerCreator {
		(ctx: Object): CustomLacer;
	}
}