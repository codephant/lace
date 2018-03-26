import { lace } from "./lace";
const noOp = () => { };
/**
 * Creates a new lacer like `lace`, but instead of taking the function to be called
 * it takes the calling context. This allows for a clearer syntax.
 */
export const laceFor = (ctx) => lace(noOp, ctx);
