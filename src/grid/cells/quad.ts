import { Node } from "../node";
import { Cell } from "./cell";
import { Value } from "../values/value";
import * as THREE from "three"

export class Quad extends Cell {

    // public static Material = new THREE.MeshBasicMaterial({
    //     vertexColors: true,
    //     side: THREE.DoubleSide
    // });

    protected static readonly Indices = [0, 1, 2, 0, 3, 2];

    public static Type: number = 9;

    constructor(nodes: Node[], value: Value) {

        super(nodes, value);
    }

    public get Type() {

        return Quad.Type;
    }

    protected get Indices() {

        return Quad.Indices;
    }

} 