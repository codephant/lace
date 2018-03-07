import { lace } from "./lace"

const noOp = () => {}

export const laceFor = (ctx) => lace(noOp, ctx)
