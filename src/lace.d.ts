import { Mutator } from "./mutator"

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
	lace (mutator: Mutator, context?: Object): this;
}

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
export const lace: (mutator: Mutator, context?: Object) => Lacer
