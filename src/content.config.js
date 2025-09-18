import * as Content from "astro:content"
import * as Loaders from "astro/loaders"

let metadata = Content.defineCollection({
  loader: Loaders.glob({ pattern: "*/info.json", base: "./raw" })
})

export let collections = { metadata }