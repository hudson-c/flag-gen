const canvas = <HTMLCanvasElement> document.getElementById('canvas')
const ctx = canvas.getContext('2d')!	

type Canvas = Shape[]
type Shape = [Point[], Colour]
type Point = [number, number]
type Colour = string

const size : [number, number] = [canvas.width, canvas.height]
console.log(size)
const [size_x, size_y] = size
const scale = [0, 0.333, 0.5, 0.667, 1]

let current_Canvas : Canvas 

let base_opts : string[] = ['h','v','d','c'] // horizonatal, vertical, diagonal, cross
let hoist_opts : string[] = []
let ensign_opts : string[] = [
	'tl', 'tc', 'tr',
	'cl', 'cc', 'cr',
	'bl', 'bc', 'br'
]

function generate_Canvas(
	max_shapes : number, // max number of shapes
	complexity : number, // chance for shapes to overlap and more polyginal shapes to appear
	max_colours: number // max number of colours
) {
	let number_of_shapes = Math.max(1, random_int(max_shapes))
	let number_of_colours = Math.max(2, random_int(max_colours))

	let colours : Colour[] = generate_colours(number_of_colours)
	console.log(colours)

	let shapes : Shape[] = generate_shapes(number_of_shapes, colours)
	
	current_Canvas = shapes 
	let scaled_canvas = scaleCanvas(current_Canvas)
	console.log(current_Canvas)

	drawCanvas(current_Canvas)
}

function clear_Canvas() {
	ctx.clearRect(0,0,size_x, size_y)
}

function scaleCanvas(canvas : Canvas) : Canvas {
	return canvas.map(([ps, c]) => [scalePoints(ps), c])
}

function scalePoints(points : Point[]) : Point[]{
	return points.map(([x, y]) => [Math.round(scale[x] * size_x), Math.round(scale[y] * size_y)])
}

function drawCanvas(canvas : Canvas) {
	canvas = scaleCanvas(canvas)
	for (let [points, colour] of canvas){
		drawShape(points, colour)
	}
}

function drawShape(points : Point[], colour? : Colour) {
	const [[orig_x, orig_y], ...coords] = points
	ctx.beginPath()

	ctx.moveTo(orig_x, orig_y)
	for (let c of coords) {
		const [x, y] = c
		ctx.lineTo(x, y)	
	}
	ctx.lineTo(orig_x, orig_y)

	if (colour) {
		ctx.fillStyle = colour ? colour : "" 
		ctx.fill()
	} else {
		ctx.strokeStyle = "black"
		ctx.stroke()
	}

	ctx.closePath()
}

function generate_colours(number_of_colours : number) : Colour[] {
	type HSL = [number, number, number]	
	const base_colour : HSL = [Math.random() * 360, 100, 40 + Math.random() * 25]
	const phi : number = 40 // angle to add to triadic / tetradic colours

	function toString(c : HSL) : Colour {
		let [h,s,l] = c
		return `hsl(${h}, ${s}%, ${l}%)`
	}

	let colours : Colour[] = [toString(base_colour)]
	let complimentary_colour : HSL = [(180 + base_colour[0]) % 360, base_colour[1], base_colour[2]]	
	console.log(base_colour, complimentary_colour)

	switch (number_of_colours) {
		case 2: // complimentary
			colours.push(toString(complimentary_colour))
			break

		case 3: // triadic
			let subTriad : HSL = [...complimentary_colour]
			subTriad[0] = (subTriad[0] - phi) % 360
			
			let superTriad : HSL = [...complimentary_colour]
			superTriad[0] = (subTriad[0] + phi) % 360

			colours.push(toString(subTriad))
			colours.push(toString(superTriad))	
			break

		case 4: // tetradic
			let tertiary : HSL = [...base_colour]
	 		tertiary[0] += phi	
			
			let quartinary : HSL = [...complimentary_colour]
			quartinary[0] += phi

			colours.push(toString(complimentary_colour))
			colours.push(toString(tertiary))
			colours.push(toString(quartinary))
			break
	}
	return colours
}

function colourise() {
	
}

function generate_shapes(number_of_shapes : number, colours : Colour[]) : Shape[] {
	let shapes : Shape[] = [
		[[[0,0],[0,4],[4,4],[4,0]], colours[0]]
	]
	for (let i = 0; i < number_of_shapes; i++) {
		shapes.push([generate_points(3), colours[(i + 1) % (colours.length)]])	
	}
	return shapes
}

function generate_points(edges : number) : Point[] {
	let possible_coordinates : Point[] = []
	for (let i = 0; i < 5 * 5; i++) {
		possible_coordinates.push([Math.floor(i / 5), i % 5])
	}
	
	let points : Point[] = []
	
	for (let i = 0; i < edges; i++) {
		let index = random_int(possible_coordinates.length - 1)
		points.push(possible_coordinates[index])
		possible_coordinates.splice(index, 1)
	}

	return points
}

function random_int(n : number) : number {
	return Math.floor(Math.random() * (n + 1)) 
}

generate_Canvas(5,0,4)
