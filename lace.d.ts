export default lace.lace;

declare namespace lace {
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
	export function lace (mutator: lace.MutatorDescriptor, context?: Object): Lacer;

	/**
	 * Creates a new lacer like `lace`, but instead of taking the function to be called
	 * it takes the calling context. This allows for a clearer syntax.
	 */
	export function lacerFor (context: Object): Lacer;

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
	export function newLacer (mutators: MutatorDescriptors): CustomLacerCreator;

	/**
	 * The method (function which expects a call context) created by this function,
	 * returns a *lacer*, that has the call context of the method and the function
	 * described by *funcOrKey* as function to lace.
	 *
	 * If the *funcOrKey* is a `String` or a `Symbol`, the function to call from the *lacer*
	 * is fetched from the call context looking up the property value, when the
	 * *lacerMethod* is called. Otherwise the given function is used directly.
	 * The use of a `String` or `Symbol` should rarely be needed, as it is only useful
	 * when the property's value to lace calls to may change over time.
	 *
	 * If the call context to the created *lacerMethod* contains a `_customLacer`
	 * property, then the supposed method is called with the context to create the
	 * associated `CustomLacer` for the object/(pseudo-)class.
	 */
	export function lacerMethod(mutator: MutatorDescriptor): CustomLacerGetter;

	/**
	 * Defines for all *key*s a property with the same name, which returns a *lacer*
	 * for the corresponding mutator in *mutators*. It further assigns to *object*'s
	 * `_customLacer` property a `CustomLacerCreator` as returned by `newLacer`.
	 * The *lacer*s returned from the properties will be constructed by calling this
	 * factory/creator. By this all specified "lacer properties" can be used, when
	 * lacing is started.
	 *
	 * If the value of *mutators*[*key*] is a `String` or `Symbol`, the function to
	 * call from the *lacer* is fetched from the call context. Otherwise the given
	 * function is used directly.
	 * The use of a `String` or `Symbol` should rarely be needed, as it is only useful
	 * when the property's value to lace calls to may change over time.
	 *
	 * @returns the *object* parameter
	 */
	export function defineLacerProperties(object: Object, mutators: MutatorDescriptors): Object;

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

	export type MutatorDescriptor = Function | string | symbol;

	export type MutatorDescriptors = {[key: string]: MutatorDescriptor};

	export type CustomLacer = Lacer | {};

	export type CustomLacerCreator = (ctx: Object) => CustomLacer;

	export type CustomLacerGetter = () => CustomLacer;
}