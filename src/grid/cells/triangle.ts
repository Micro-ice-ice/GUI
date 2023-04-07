import { Node } from "../node";
import { Cell } from "./cell";
import { Value } from "../values/value";
import * as THREE from "three"

export class Triangle extends Cell {

    public static Material = new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide
    });

    public static Type: number = 5;

    public ThreeObject: THREE.Mesh;

    constructor(nodes: Node[], value: Value) {

        super(nodes, value);

        const vertices = ([] as number[]).concat(...this.Nodes.map((node: Node) => node.toArray()));

        const indicies: number[] = [0, 1, 2];

        const colors: number[] = [];

        for (let i = 0; i < this.Nodes.length; ++i) {

            colors.push(Math.random(), Math.random(), Math.random());
        }

        this.Geometry.setIndex(indicies);
        this.Geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.Geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

        this.ThreeObject = new THREE.Mesh(this.Geometry, Triangle.Material);
    }

} 