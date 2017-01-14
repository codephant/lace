import describe from "tape"
import lace from "./lace.tape"
import newLacer from "./newLacer.tape"
import lacerMethod from "./lacerMethod.tape"

[ lace
, newLacer
, lacerMethod
].forEach(t => t(describe))
