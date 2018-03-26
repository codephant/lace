import { laceCreator } from "./laceCreator";
import { laceFor } from "./laceFor";
import { intoDescriptors } from "./intoDescriptors";
const customLacerKey = "$CustomLacer";
const makeLacerDescriptor = (fn) => ({
    configurable: true,
    get() {
        return (this[customLacerKey] || laceFor)(this).lace(fn);
    }
});
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
export const defineLaceProperties = (object, mutators) => (Object.defineProperty(object, customLacerKey, {
    configurable: true,
    value: laceCreator(mutators)
}),
    Object.defineProperties(object, intoDescriptors(mutators, makeLacerDescriptor)));
export const defineLaceProperty = (object, key, mutator) => Object.defineProperty(object, key, makeLacerDescriptor(mutator));
