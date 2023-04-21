import { Node } from "../node";
import { Cell } from "./cell";
import { Value } from "../values/value";
import * as THREE from "three"

export class Pixel extends Cell {

    // public static Material = new THREE.MeshBasicMaterial({
    //     vertexColors: true,
    //     side: THREE.DoubleSide
    // });

    protected static readonly Indices = [0, 1, 2, 1, 2, 3]

    public static readonly Type: number = 8;

    constructor(nodes: Node[], value: Value) {

        super(nodes, value);
    }

    public get Type() {

        return Pixel.Type;
    }

    protected get Indices() {

        return Pixel.Indices;
    }

} 