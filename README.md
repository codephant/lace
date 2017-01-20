# Tie up your calls like you tie your shoes

Sometimes setting up certain parts of an application requires a lot of
configuration calls, where one calls the same family of functions over and over
again. lace.js tries to make this process a little less verbose by reducing
the syntax overhead. It allows you to chain multiple calls together assuming
the called functions/methods were called for their side effects not their
return values.

## Usage/Interface

### lace (*mutator*: Function|string|symbol, *context*?: Object): Lacer

Creates a new function that passes all it's arguments to the *mutator*.
However it ignores the return value of *mutator* and returns itself.
This enables the chaining of calls to *mutator*.

Optionally the calling context (thisArg) can be passed to lace, which will
then forward it to mutator with each call.

If *mutator* is a string or symbol the actual mutator function is taken from
the given calling context. If no context was given a TypeError is thrown.

```js
const greeting = [];
lace(word => greeting.push(word))
("hello")("world")("nice")("to")("meet")("you");
greeting.join(" ") === "hello world nice to meet you"; // true
```

### lacerFor (*context*: Object): Lacer

Creates a new lacer like lace, but instead of taking the function to be called
it takes the calling context. This allows for a clearer syntax.

```js
lacerFor(document.querySelector("div.my-fancy"))
	.lace("setAttribute")
	("title", "some fancy title")
	("data-awesome", "fancy and awesome info")
	.lace(Element.prototype.addEventListener)
	("click", ev => { console.log("my fancy was clicked") }
	("mouseout", ev => {
		lace(console.log, console)
		("don't leave my fancy, consider this:")
		(ev.target.dataset.awesome)
	});
```

### newLacer (*mutators*: {[*key*: string]: Function|string|symbol}): (context: Object) => CustomLacer

Creates a factory function that returns a customized lacing function (*lacer*)
with *mutators* as its methods. This can be used to create *lacer*s, that are
specialized in lacing method calls to a certain type/class.

If the value of a *mutators key* is a function, then the very function is
used for the laced calls. However if the value is a string/symbol, then the function
is fetched from the calling context given to the *lacer* on instantiation.

See this DOM example:

```js
const domLacer = newLacer(
	{ attribute: "setAttribute"
	, listener: Element.prototype.addEventListener
	}
);
domLacer(document.querySelector("div.my-fancy"))
	.attribute
	("title", "some fancy title")
	("data-awesome", "fancy and awesome info")
	.listener
	("click", ev => { console.log("my fancy was clicked") }
	("mouseout", ev => {
		lace(console.log, console)
		("don't leave my fancy, consider this:")
		(ev.target.dataset.awesome)
	});
```


### lacerMethod (*funcOrKey*: Function|string|symbol): () => CustomLacer

The method (function which expects a call context) created by this function,
returns a *lacer*, that has the call context of the method and the function
described by *funcOrKey* as function to lace.

If the *funcOrKey* is a `String` or a `Symbol`, the function to call from the *lacer*
is fetched from the call context looking up the property value, when the
*lacerMethod* is called. Otherwise the given function is used directly.
The use of a `String` or `Symbol` should rarely be needed, as it is only useful
when the property's value to lace calls to may change over time.

If the call context to the created *lacerMethod* contains a `_customLacer`
property, then the supposed method is called with the context to create the
associated `CustomLacer` for the object/(pseudo-)class.

```js
function Counter () { this.count = 0; }
Counter.prototype =
{ inc: lacerMethod(function Counter_inc (n = 1) { this.count += n; })
};

const counter = new Counter();
counter.inc()(1)(2)(3);
counter.count === 6; // true
```


### defineLacerProperties (*object*: Object, *mutators*: {[*key*: string]: Function|string|symbol}): *object*

Defines for all *key*s a property with the same name, which returns a *lacer*
for the corresponding mutator in *mutators*. It further assigns to *object*'s
`_customLacer` property a `CustomLacerCreator` as returned by `newLacer`.
The *lacer*s returned from the properties will be constructed by calling this
factory/creator. By this all specified "lacer properties" can be used, when
lacing is started.

If the value of *mutators*[*key*] is a `String` or `Symbol`, the function to
call from the *lacer* is fetched from the call context. Otherwise the given
function is used directly.
The use of a `String` or `Symbol` should rarely be needed, as it is only useful
when the property's value to lace calls to may change over time.

```js
function Counter () { this.count = 0; }
defineLacerProperties(Counter.prototype
, { inc: function(n = 1) { this.count += n; }
  , dec: function(n = 1) { this.count -= n; }
  }
);

const counter = new Counter();
counter.inc(1)(3)(5).dec(4)(2);
counter.count === 3; // true

```


### *lacer* (...*args*: Array<any>): *lacer*

Call the currently laced mutator with the arguments given to the function call.
If the *lacer* was given a calling context on instantiation or via
*lacer*.lace, then this context is also forwarded to the mutator.


### *lacer*.lace (*mutator*: Function, *context*?: Object): *lacer*

Changes the laced function and optionally the calling context.
Beginning with the next call the *lacer* will use the new function and context.

## License

Available under Internet Systems Consortium License; see LICENSE file.

## Ideas, requests and bug reports

... are always welcome and can be contributed in the
[project's issue section](https://github.com/codephant/lace/issues).