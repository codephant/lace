import * as describe from "tape"
import lace from "./lace.tape"
import creator from "./creator.tape"
import define from "./define.tape"

[ lace
, creator
, define
].forEach(t => t(describe))
