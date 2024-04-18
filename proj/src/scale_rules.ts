export function default_scale([x, y] : [number, number], [max_x, max_y] : [number, number]) {
	let scale = [0, 0.333, 0.5, 0.667, 1]
	let new_x = Math.round(scale[x] * max_x)
	let new_y = Math.round(scale[y] * max_y)
	return [new_x, new_y]	
}

export function grid_scale([x, y] : [number, number], [max_x, max_y] : [number, number]) {
	let new_x = Math.round(x / 4 * max_x)
	let new_y = Math.round(y / 4 * max_y)
	return [new_x, new_y]
}
