import { Node } from "../node";
import { Cell } from "./cell";
import { Value } from "../values/value";
import * as THREE from "three"

export class Voxel extends Cell {

    // public static Material: THREE.Material = new THREE.MeshBasicMaterial({
    //     vertexColors: true,
    //     side: THREE.DoubleSide
    // });

    protected static readonly Indices = [
        0, 1, 2, 1, 2, 3, // face 1
        4, 5, 6, 5, 6, 7, // face 2
        0, 1, 4, 1, 4, 5, // face 1
        2, 3, 6, 3, 6, 7, // face 4
        1, 3, 5, 3, 5, 7, // face 5
        0, 2, 4, 2, 4, 6  // face 6
    ];

    public static Type: number = 11;

    constructor(nodes: Node[], value: Value) {

        super(nodes, value);
    }

    public get Type() {

        return Voxel.Type;
    }

    protected get Indices() {

        return Voxel.Indices;
    }

} 