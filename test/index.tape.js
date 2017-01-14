import describe from "tape"
import lace from "./lace.tape"
import newLacer from "./newLacer.tape"

[ lace
, newLacer
].forEach(t => t(describe))
