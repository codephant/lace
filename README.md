# Tie up your calls like you tie your shoes

Sometimes setting up certain parts of an application requires a lot of
configuration calls, where one calls the same family of functions over and over
again. `lace.js` tries to make this process a little less verbose by reducing
the syntax overhead. It allows you to chain multiple calls together assuming
the called functions/methods were called for their side effects not their
return values.

## Usage/Interface

### `lace(`*`mutator`*`: Function|string|symbol, `*`context`*`?: Object): Lacer`

Creates a new function that passes all it's arguments to the *`mutator`*.
However it ignores the return value of *`mutator`* and returns itself.
This enables the chaining of calls to *`mutator`*.

Optionally the calling context (`thisArg`) can be passed to lace, which will
then forward it to `mutator` with each call.

If *`mutator`* is a string or symbol the actual mutator function is taken from
the given calling context. If no context was given a `TypeError` is thrown.

```js
const greeting = [];
lace(word => greeting.push(word))
("hello")("world")("nice")("to")("meet")("you");
greeting.join(" ") === "hello world nice to meet you"; // true
```

### `lacerFor(`*`context`*`: Object): Lacer`

Creates a new lacer like `lace`, but instead of taking the function to be called
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

### `newLacer(`*`mutators`*`: {[`*`key`*`: string]: Function|string|symbol}): CustomLacerCreator`

Creates a factory function that returns a customized lacing function (*lacer*)
with *`mutators`* as its methods. This can be used to create *lacer*s, that are
specialized in lacing method calls to a certain type/class.

If the value of a *`mutators` `key`* is a function, then the very function is
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

### *`lacer`*`(...`*`args`*`: Array<any>): this`

Call the currently laced mutator with the arguments given to the function call.
If the `*lacer*` was given a calling context on instantiation or via
*`lacer`*`.lace`, then this context is also forwarded to the mutator.


### *`lacer`*`.lace(`*`mutator`*`: Function, `*`context`*`?: Object): this`

Changes the laced function and optionally the calling context.
Beginning with the next call the *`lacer`* will use the new function and context.

## License

Available under Internet Systems Consortium License; see LICENSE file.

## Ideas, requests and bug reports

... are always welcome and can be contributed in the
[project's issue section][https://github.com/codephant/lace/issues].