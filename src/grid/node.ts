import { Vector3 } from "three"
import { Value } from "./values/value";

export class Node extends Vector3 {

    public Value: Value

    constructor(x: number, y: number, z: number, value: Value) {
        super(x, y, z);
        this.Value = value;
    }

}
