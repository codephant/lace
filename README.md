# Tie up your calls like you tie your shoes

Sometimes setting up certain parts of an application requires a lot of
configuration calls, where one calls the same family of functions over and over
again. `lace.js` tries to make this process a little less verbose by reducing
the syntax overhead. It allows you to chain multiple calls together assuming
the called functions/methods were called for their side effects not their
return values.

## Usage/Interface

### *lace*(*mutator*: Function, *context*?: Object)

Creates a new function, that passes all it's arguments to the *mutator*.
However it ignores the return value of *mutator* and returns itself.
This enables the chaining of calls to *mutator*.

Optionally the calling context (`thisArg`) can be passed to lace, which will
then forward it to *mutator* with each call.

```js
const greeting = [];
lace(word => greeting.push(word))
("hello")("world")("nice")("to")("meet")("you");
```