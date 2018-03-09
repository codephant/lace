import { Lacer } from "./lace";
import { Mutators } from "./mutator";

export type LaceProperties<K extends string> = {
	readonly [k in K]: CustomLacer<K>
}

export type CustomLacer<K extends string> = Lacer & LaceProperties<K>

export interface CustomLacerCreator<K> {
	(ctx: Object): CustomLacer<K>
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
 * @param mutators All mutator functions that can be called on the context.
 */
export const laceCreator: <K extends string>(mutators: Mutators<K>) => CustomLacerCreator<K>
