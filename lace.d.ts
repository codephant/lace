export default lace;

/**
 * Creates a new function that passes all it's arguments to the *`mutator`*.
 * However it ignores the return value of *`mutator`* and returns itself.
 * This enables the chaining of calls to *`mutator`*.
 *
 * Optionally the calling context (sometimes called *thisArg*) can be passed to
 * `lace`, which will then forward it to `mutator` with each call.
 *
 * If *`mutator`* is a string or symbol the actual mutator function is taken from
 * the given calling context. If no context was given a `TypeError` is thrown.
 */
export function lace (mutator: lace.MutatorDescriptor, context?: Object): lace.Lacer;

/**
 * Creates a new lacer like `lace`, but instead of taking the function to be called
 * it takes the calling context. This allows for a clearer syntax.
 */
export function lacerFor (context: Object): lace.Lacer;

/**
 * Creates a factory function that returns a customized lacing function (*lacer*)
 * with *`mutators`* as its methods. This can be used to create *lacer*s, that are
 * specialized in lacing method calls to a certain type/class.
 *
 * If the value of a *`mutators` `key`* is a function, then the very function is
 * used for the laced calls. However if the value is a string, then the function
 * is fetched from the calling context given to the *lacer* on instantiation.
 *
 * @param mutators All mutator functions that can be called on the context.
 */
export function newLacer (mutators: {[key: string]: lace.MutatorDescriptor}): lace.CustomLacerCreator;

declare namespace lace {
	export type MutatorDescriptor = Function | string | symbol

	export interface Lacer {
		/**
		 * Call the currently laced mutator with the arguments given to the function call.
		 * If the `*lacer*` was given a calling context on instantiation or via
		 * *`lacer`*`.lace`, then this context is also forwarded to the mutator.
		 */
		(...args: Array<any>): this;

		/**
		 * Changes the laced function and optionally the calling context.
		 * Beginning with the next call the *`lacer`* will use the new function and context.
		 */
		lace (mutator: MutatorDescriptor, context?: Object): this;
	}

	export type CustomLacer = Lacer | {};

	export interface CustomLacerCreator {
		(ctx: Object): CustomLacer;
	}
}