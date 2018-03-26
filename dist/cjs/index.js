'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isKeyType = { string: true, symbol: true };
const resolveFn = (fn, ctx) => {
    if (typeof fn === "function")
        return fn;
    else {
        if (isKeyType[typeof fn]) {
            if (typeof ctx == null) {
                throw new TypeError("lace: can only use symbols and string for functions when context is given");
            }
            fn = ctx[fn];
        }
        if (typeof fn !== "function") {
            throw new TypeError("lace: can only lace function/methods; found: " + typeof fn);
        }
        return fn;
    }
};
const setContext = (lace, fn, ctx) => {
    if (typeof ctx !== "undefined")
        lace.ctx = ctx;
    lace.fn = resolveFn(fn, lace.ctx);
    return lace;
};
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
const lace = (mutator, context) => {
    const lace = {
        fn: undefined, ctx: undefined,
        lacer: Object.defineProperty((...args) => (lace.fn.apply(lace.ctx, args), lace.lacer), "lace", { value: (fn, ctx) => setContext(lace, fn, ctx).lacer })
    };
    return lace.lacer.lace(mutator, context);
};

const noOp = () => { };
/**
 * Creates a new lacer like `lace`, but instead of taking the function to be called
 * it takes the calling context. This allows for a clearer syntax.
 */
const laceFor = (ctx) => lace(noOp, ctx);

const intoDescriptors = (mutators, descriptor) => Object.keys(mutators).reduce((descriptors, mkey) => (descriptors[mkey] = descriptor(mutators[mkey]), descriptors), {});

const lacingDescriptor = (fn) => ({ configurable: true, get() { return this.lace(fn); } });
const makeCreator = (descriptors) => (ctx) => Object.defineProperties(laceFor(ctx), descriptors);
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
const laceCreator = (mutators) => makeCreator(intoDescriptors(mutators, lacingDescriptor));

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
const defineLaceProperties = (object, mutators) => (Object.defineProperty(object, customLacerKey, {
    configurable: true,
    value: laceCreator(mutators)
}), Object.defineProperties(object, intoDescriptors(mutators, makeLacerDescriptor)));
const defineLaceProperty = (object, key, mutator) => Object.defineProperty(object, key, makeLacerDescriptor(mutator));

exports.defineLaceProperties = defineLaceProperties;
exports.defineLaceProperty = defineLaceProperty;
exports.lace = lace;
exports.laceCreator = laceCreator;
exports.laceFor = laceFor;
