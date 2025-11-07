import * as Content from "astro:content"

async function fetch_timed(url, timeout = 60000) {
	let controller = new AbortController()
	let id = setTimeout(() => controller.abort(), timeout)
	try {
		let response = await fetch(url, { signal: controller.signal })
		clearTimeout(id)
		return response
	} catch(error) {
		clearTimeout(id)
		throw error
} }

async function check_html(url) {
	try {
		let response = await fetch_timed(url)
		if(response.ok) {
			let type = response.headers.get("content-type")
			return type && (type.includes("text/html") || type.includes("application/xhtml+xml"))
		}
	} catch {
		return false
} }

let apps = await Content.getCollection("metadata", ({ data }) => data.app_type == "hosted")
let total = apps.length
let live = [], dead = []

for await(let app of apps) {
	let manifest = new URL(app.data.manifest_url)
	try {
		let response = await fetch_timed(manifest)
		if(response.ok) {
			await response.json()
			live.push(app)
		} else {
			throw new Error()
		}
	} catch {
		let parent = new URL(manifest.pathname.split("/").slice(0, -1).join("/"), manifest.origin)
		let root = new URL("/", manifest.origin)

		if(await check_html(parent)) {
			live.push(app)
		} else if(await check_html(root)) {
			live.push(app)
		} else {
			dead.push(app)
} } }

export { live, dead, total }