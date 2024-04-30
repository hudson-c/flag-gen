export function generate_base(type : string, parts : number, colours : string[]) {
	switch (type) {
		case 's': // solid
			return generate_solid_base(colours)
		case 'v': // vertical
			return generate_vertical_base(parts, colours)

		case 'h': // horizontal
			return generate_horizontal_base(parts, colours)

		// case 'dt': // diagonal from top
			// generate_diagonal_top_base(parts, colours)
			// break
// 
		// case 'db': // diagonal from bottom
			// generate_diagonal_bot_base()
			// break
// 
		// case 'ch': // checkers
			// generate_cross_base(parts, colours)
		// break
		// 
		// case 'x': // diagonal cross
			// generate_cross_base(parts, colours)
		// break
// 
		// case '+': // vertical cross
			// generate_cross_base(parts, colours)
		// break
	}
}

function generate_solid_base(colours : string[]) {
	return [[[0,0], [0,1], [1,1], [1,0]], colours[Math.floor(Math.random() * colours.length)]]
}

function generate_vertical_base(parts : number, colours : string[]) {
	let shapes = []
	for (let i = 1; i <= parts; i++) {
		shapes.push([[[i-1, 0], [i, 0], [i, 1], [i-1, 1]], colours[(i - 1) % Math.floor(Math.random() * colours.length)]])
	}
	return shapes
}

function generate_horizontal_base(parts: number, colours : string[]) {
	let shapes = []
	for (let i = 1; i <= parts; i++) {
		shapes.push([[[0, i-1], [0, i], [1, i], [1, i-1]], colours[(i - 1) % Math.floor(Math.random() * colours.length)]])
	}
	return shapes
}

export function generate_hoist(parts : number, max_width : number, colours : string[]) {
	let shapes = []
	let shape = []
	let width = Math.floor(Math.random() * max_width - 1) 
	shape.push([0, 0])
	shape.push([0, parts])
	if (parts % 2 == 0) {
		return []
	} else {
		shape.push([width, (parts + 1) / 2])	
	}
	return shapes.push(shape)
}

function generate_ensignia(has_hoist : boolean) {

}