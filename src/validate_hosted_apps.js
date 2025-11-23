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


// Fetch a page, locate its manifest link, fetch the manifest and return
// useful details (final manifest URL after redirects and parsed JSON).
async function getPwaDetails(pageUrl) {
	try {
		let response = await fetch_timed(pageUrl)
		if(!response.ok) return null
		let html = await response.text()

		// Look for manifest link in HTML
		let manifestMatch = html.match(/<link[^>]+rel=["']manifest["'][^>]+href=["']([^"']+)["'][^>]*>/i)
		if(!manifestMatch) {
			manifestMatch = html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']manifest["'][^>]*>/i)
		}
		if(!manifestMatch) return null

		let manifestUrl = manifestMatch[ 1 ]
		// Resolve to an absolute URL, handling protocol-relative and relative URLs
		try {
			manifestUrl = new URL(manifestUrl).href
		} catch(_) {
			manifestUrl = new URL(manifestUrl, response.url).href
		}

		// Fetch the manifest; use the response.url as the final URL (after redirects)
		let manifestResponse = await fetch_timed(manifestUrl)
		if(!manifestResponse.ok) return null
		let manifestJson = await manifestResponse.json()
		return {
			manifestUrl: manifestResponse.url || manifestUrl,
			manifestJson,
			pageUrl: response.url,
		}
	} catch(e) {
		return null
	}
}

let apps = await Content.getCollection("metadata", ({ data }) => data.app_type == "hosted")
let total = apps.length
let live = [], dead = []

// Check Firefox proprietary manifest URLs for Firefox hosted apps
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

		if(await check_html(parent) || await check_html(root)) {
			live.push(app)
		} else {
			dead.push(app)
} } }

// PWA detection for all hosted apps (apps can have both Firefox manifests and PWAs)
let pwas = []
// Also collect PWA manifest details (final manifest URL and computed id when needed)
let pwa_data = {}
for await(let app of apps) {
	try {
		let manifest = new URL(app.data.manifest_url)
		let parentPath = manifest.pathname.split("/").slice(0, -1).join("/") + "/"
		let parent = new URL(parentPath, manifest.origin)
		parent.protocol = "https:"
		let root = new URL("/", manifest.origin)
		root.protocol = "https:"

		// Try to resolve a PWA manifest at parent or root and capture details
		let details = null
		try {
			details = await getPwaDetails(parent)
		} catch {}
		if(!details) {
			try {
				details = await getPwaDetails(root)
			} catch {}
		}

		if(details) {
			// Keep the original app object in `pwas` for compatibility
			pwas.push(app)

			// Per W3C PWA spec:
			// - If manifest lacks `id`, the id defaults to the manifest URL.
			// - If manifest lacks `start_url`, the start_url defaults to the page URL.
			// We compute the id (absolute URL) from start_url only if manifest lacks explicit `id`.
			let computedId = undefined
			if(!details.manifestJson.id) {
				// start_url defaults to pageUrl if not present
				let startUrl = details.manifestJson.start_url || details.pageUrl
				try {
					computedId = new URL(startUrl, details.manifestUrl).href
				} catch {}
			}

			pwa_data[ app.data.slug ] = {
				manifest_url: details.manifestUrl,
				install_page: details.pageUrl,
				// only include `id` when manifest lacks one and a computed id exists
				id: details.manifestJson.id ? undefined : computedId,
			}
		}
	} catch(e) {
		// Ignore apps with invalid or missing manifest_url
	}
}

export { live, dead, pwas, pwa_data, total }