import { Node } from "../node";
import { Cell } from "./cell";
import { Value } from "../values/value";
import * as THREE from "three"

export class Points extends Cell {

    public static Material = new THREE.PointsMaterial({
        vertexColors: true
    });

    public static Type: number = 2;

    public ThreeObject: THREE.Points;

    constructor(nodes: Node[], value: Value) {

        super(nodes, value);

        const vertices = ([] as number[]).concat(...this.Nodes.map((node: Node) => node.toArray()));

        const colors: number[] = [];

        for (let i = 0; i < this.Nodes.length; ++i) {

            colors.push(Math.random(), Math.random(), Math.random());
        }

        this.Geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.Geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

        this.ThreeObject = new THREE.Points(this.Geometry, Points.Material);
    }
} 