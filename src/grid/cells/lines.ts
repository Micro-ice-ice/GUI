import { Node } from "../node";
import { Cell } from "./cell";
import { Value } from "../values/value";
import * as THREE from "three"

export class Lines extends Cell {

    public static Material: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        linewidth: 1,
    });

    public static Type: number = 3;

    public ThreeObject: THREE.Line;

    constructor(nodes: Node[], value: Value) {

        super(nodes, value);

        this.ThreeObject = new THREE.Line(this.Geometry, Lines.Material);
    }

    public get Type() {

        return Lines.Type;
    }

    protected get Indices() {

        return Lines.Indices;
    }

} 