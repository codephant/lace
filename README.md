# Tie up your calls like you tie your shoes

Sometimes setting up certain parts of an application requires a lot of
configuration calls, where one calls the same family of functions over and over
again. `lace.js` tries to make this process a little less verbose by reducing
the syntax overhead. It allows you to chain multiple calls together assuming
the called functions/methods were called for their side effects not their
return values.

## Usage/Interface

### `lace(`*`mutator`*`: Function, `*`context`*`?: Object): Lacer`

Creates a new function that passes all it's arguments to the *`mutator`*.
However it ignores the return value of *`mutator`* and returns itself.
This enables the chaining of calls to *`mutator`*.

Optionally the calling context (`thisArg`) can be passed to lace, which will
then forward it to `mutator` with each call.

```js
const greeting = [];
lace(word => greeting.push(word))
("hello")("world")("nice")("to")("meet")("you");
greeting.join(" ") === "hello world nice to meet you"; // true
```


### `lace.derive(`*`mutators`*`: {[`*`key`*`: string]: Function|string}): CustomLacerCreator`

Creates a factory function that returns a customized lacing function (*lacer*)
with *`mutators`* as its methods. This can be used to create *lacer*s, that are
specialized in lacing method calls to a certain type/class.

If the value of a *`mutators`* *`key`* is a function, then the very function is
used for the laced calls. However if the *`key`* is a string, then the function
is fetched from the calling context of the *lacer*.

See this DOM example:

```js
const domLacer = lace.derive(
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