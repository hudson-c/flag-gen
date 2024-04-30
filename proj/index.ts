const base_path = './public'
const build_path = `${base_path}/assets`
const default_page = `${base_path}/home.html`

await Bun.build({
	entrypoints: ['./srcaltalt/generator.ts'],
	outdir: build_path
})

const server = Bun.serve({
	port: 3000,
	async fetch(req) {
		const filePath = base_path + new URL(req.url).pathname
		console.log(filePath)
		if (filePath.startsWith(build_path)) {	
			const file = Bun.file(filePath)
			return new Response(file)
		}
		else {
			const file = Bun.file(default_page)
			return new Response(file)
		}
	},
	error() {
		return new Response(null, { status: 404 })
	},
})

console.log(`Listening on http://localhost:${server.port} ...`);
