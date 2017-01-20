import describe from "tape"
import lace from "./lace.tape"
import newLacer from "./newLacer.tape"
import lacerMethod from "./lacerMethod.tape"
import defLacerProps from "./defLacerProps.tape"

[ lace
, newLacer
, lacerMethod
, defLacerProps
].forEach(t => t(describe))
