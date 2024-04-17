import {Node, Flag} from './structs'


//let f = new Flag(5, 5)
const canvas = <HTMLCanvasElement> document.getElementById('canvas')

function drawShape(coords : [number, number][], fill_colour : string) {
	const [[orig_x, orig_y], ...cs] = coords
	const ctx   = canvas.getContext('2d')!	
	ctx.moveTo(orig_x, orig_y)

	for (let c of cs) {
		const [x, y] = c
		ctx.lineTo(x, y)	
	}
	ctx.lineTo(orig_x, orig_y)
	ctx.fill()
}

const square : [number, number][] = [
	[10,10],
	[10,40],
	[40,40],
	[40,10]
]

const triangle : [number, number][] = [
	[50,50],
	[100,50],
	[75,100]
]

drawShape(square, 'red')
drawShape(triangle, 'green')
