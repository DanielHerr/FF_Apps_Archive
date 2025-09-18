import * as Content from "astro:content"

let apps = await Content.getCollection("metadata", ({ data }) => data.app_type == "hosted")
let total = apps.length
let live = [], dead = []
for await(let app of apps) {
	try {
		let response = await fetch(app.data.manifest_url)
		if(response.ok) {
			let result = await response.json()
			live.push(app)
		} else {
			dead.push(app)
		}
	} catch {
		dead.push(app)
	}
}

export { live, dead, total }