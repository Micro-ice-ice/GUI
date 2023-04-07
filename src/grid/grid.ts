import { Node } from "./node"
import { Value } from "./values/value";
import * as CellType from "./cells/cell_type"

export class Grid {

    public Nodes: Node[] = [];

    public Cells: CellType.Cell[] = [];

    constructor(json_string: string) {

        const data = JSON.parse(json_string);
        const nodes = data.nodes.map((node: { x: number; y: number; z: number; value: Value; }) => new Node(node.x, node.y, node.z, node.value));
        const cells = data.cells.map((cell: { nodes: any[]; type: number; value: Value; }) => {
            const cell_nodes = cell.nodes.map((node_index: string | number) => nodes[node_index]);

            switch (cell.type) {

                case 1:
                case 2:

                    return new CellType.Points(cell_nodes, cell.value);

                    break; { }

                case 3:
                case 4:

                    return new CellType.Cell(cell_nodes, cell.value);

                    break;

                case 5:

                    return new CellType.Triangle(cell_nodes, cell.value);

                    break;

                case 6:

                    return undefined;

                    break;

                case 8:

                    return new CellType.Pixel(cell_nodes, cell.value);

                    break;

                case 9:

                    return new CellType.Quad(cell_nodes, cell.value);

                    break;

                case 10:

                    return new CellType.Tetrader(cell_nodes, cell.value);

                    break;

                case 11:

                    return new CellType.Voxel(cell_nodes, cell.value);

                    break;

                default:

                    return undefined;
            }


        });

        this.Cells = cells;
        this.Nodes = nodes;
    }
}