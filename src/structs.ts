export class Node {
	connections : Node[]
	x : number
	y : number

	constructor(x : number, y : number) {
		this.connections = []
	}
}

export class Graph {
	nodes : Node[]

	constructor(nodes: Node[]) {
		this.nodes = nodes
	}

	johnsons() {} // TODO implement johnsons alg

	private bellman_ford() {} // TODO implement bellman_ford alg

	private remove_overlap(cyclics : Node[][]) {} // TODO remove graph overlaps. IE, kill parents if A -> B -> C -> A & B -> D -> C -> B exist but so does A -> B -> D -> C -> A, reject the latter and accept the former will need to do geometric overlap too - such as intercepts on lines
}	

export class Flag {
	nodes : Node[][]

	constructor(size_x : number, size_y : number) {
		for (let x = 0; x < size_x; x++) {
			let column : Node[] = []
			for (let y = 0; y < size_y; y++) {
				column.push(new Node(x, y))	
			}
			this.nodes.push(column)
		}

		for (let x = 0; x < size_x; x++) {
			switch (x) {
				case 0: { // bottom left and top left corners
					this.nodes[0][0].connections = [this.nodes[0][1], this.nodes[1][0]]
					this.nodes[0][size_y].connections = [this.nodes[0][size_y-1], this.nodes[1][size_y]]

					for (let y = 1; y < size_y - 1; y++) { // left column excl corners
						this.nodes[0][y].connections = [this.nodes[0][y-1], this.nodes[0][y+1]]
					}
					break
				}

				case size_x: { // bottom right and top right corner
					this.nodes[size_x][0].connections = [this.nodes[size_x][1], this.nodes[size_x-1][0]]
					this.nodes[size_x][size_y].connections = [this.nodes[size_x][size_y-1], this.nodes[size_x-1][size_y]]

					for (let y = 1; y < size_y - 1; y++) { // right column excl corners
						this.nodes[0][y].connections = [this.nodes[0][y-1], this.nodes[0][y+1]]
					}
					break
				}

				default: { // bottom and top row
					this.nodes[x][0].connections = [this.nodes[x-1][0], this.nodes[x+1][0]]
					this.nodes[x][size_y].connections = [this.nodes[x-1][size_y], this.nodes[x+1][size_y]]
				}
			}
		}
	}

	private to_graph() {
	 let flat_flag = this.nodes.reduce((accumulator, column) => accumulator.concat(column), [])	
	 let used_nodes = flat_flag.filter((x) => x.connections.length) // non-zero length
	 return new Graph(used_nodes)
	}
}
