import {Node, Flag, Shape} from './structs'
import {default_scale} from './scale_rules'

const canvas = <HTMLCanvasElement> document.getElementById('canvas')
const ctx = canvas.getContext('2d')!	

const size : [number, number] = [canvas.width, canvas.height]
const [size_x, size_y] = size

let triangle_s : Shape = new Shape([new Node(0,0), new Node(1,2), new Node(0,4)])
let scaled_triangle = triangle_s.scale(size, default_scale)

function clear_canvas() {
	ctx.clearRect(0,0,size_x, size_y)
}

function drawShape(coords : [number, number][], fill_colour : string) {
	const [[orig_x, orig_y], ...cs] = coords
	ctx.beginPath()

	ctx.moveTo(orig_x, orig_y)
	for (let c of cs) {
		const [x, y] = c
		ctx.lineTo(x, y)	
	}
	ctx.lineTo(orig_x, orig_y)

	ctx.fillStyle = fill_colour
	ctx.fill()

	ctx.closePath()
}

console.log(scaled_triangle)
let scaled_triangle_coords = scaled_triangle.to_coordinates()
console.log(scaled_triangle_coords)
drawShape(scaled_triangle_coords, "red")
