import { Node } from "../node";
// import { Attribute } from "../values/attribute";
import { Scalar } from "../values/scalar";
import { Value } from "../values/value";
import * as THREE from "three"

export class Cell {

    protected static readonly Indices: number[] = [];

    public static Material: THREE.Material = new THREE.MeshLambertMaterial({
        vertexColors: true,
        side: THREE.FrontSide,
        wireframe: true
    });

    public static readonly Type: number = 0;

    public Value: Value;

    public Nodes: Node[];

    public ThreeObject: THREE.Object3D;

    public Geometry: THREE.BufferGeometry = new THREE.BufferGeometry();

    constructor(nodes: Node[], value: Value) {

        this.Nodes = nodes;
        this.Value = value;

        const vertices = ([] as number[]).concat(...this.Nodes.map((node: Node) => node.toArray()));

        const colors: number[] = [];

        for (let i = 0; i < this.Nodes.length; ++i) {

            colors.push(0, 0, 1);
        }

        this.Geometry.setIndex(this.Indices)
        this.Geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.Geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
        this.Geometry.computeVertexNormals()

        this.ThreeObject = new THREE.Mesh(this.Geometry, Cell.Material);
    }

    public get Type() {

        return Cell.Type;
    }

    protected get Indices() {

        return Cell.Indices;
    }

    public SetColorByValueInNodes(attribute_index: number) {

        const colors: number[] = [];

        for (let i = 0; i < this.Nodes.length; ++i) {

            const scalar: Scalar = <Scalar>this.Nodes[i].Value.Attributes[attribute_index];
            colors.push((1 - scalar.Value), (0.5 - Math.abs(0.5 - scalar.Value) * 2), scalar.Value);
        }

        this.Geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    }

    public SetColorByValueInCell(attribute_index: number) {

        const colors: number[] = [];

        const scalar: Scalar = <Scalar>this.Value.Attributes[attribute_index];

        for (let i = 0; i < this.Nodes.length; ++i) {

            colors.push((1 - scalar.Value), (0.5 - Math.abs(0.5 - scalar.Value) * 2), scalar.Value);
        }

        this.Geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    }


}