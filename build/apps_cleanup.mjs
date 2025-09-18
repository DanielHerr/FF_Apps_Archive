/*
	cleans up app files

	for each app, aka each direct child folder in folder:
		delete the thumbnails folder if it exists
		read the info.json file to get app metadata
		for the images, usually .png, consisting of the icon in the app root (usually named [app.id]-128.png_modified=timestamp), and in the screenshots folder, rename them to remove the _modified=timestamp suffix
		using zip.js, extract the manifest.webapp from the package_path zip file, and save it as full_manifest.json in the app root folder
		if manifest.webapp (json file) exists, change the package_path, keeping only the original filename in the url, replacing the path with /app/[app.slug]/[filename]
			ex https://marketplace.firefox.com/downloads/file/260827/openpanzer-2.9.0.zip becomes /app/openpanzer/openpanzer-2.9.0.zip
		if it doesn't exist and the app type is packaged, create it by copying the name, version, developer from full_manifest.json and adding the package_path as earlier, and size in bytes of the zip file
		check if the app type is packaged, if so using zip.js again, delete the META-INF folder from the zip file, and save the modified zip file back to the same location
*/

import * as Filesystem from "node:fs/promises"
import * as Filesys from "node:fs"
import * as Path from "node:path"
import * as Zip from '@zip.js/zip.js'

const OUTPUT_FOLDER = "apps"

// todo fix double looping, use static array folder read
for await(let app_folder of await Filesystem.opendir(OUTPUT_FOLDER)) {

	console.log("processing app:", app_folder.name)

	let app_path = Path.join(OUTPUT_FOLDER, app_folder.name)

	await Filesystem.rm(app_path + "/thumbnails", { recursive: true, force: true })

	let metadata = JSON.parse(await Filesystem.readFile(app_path + "/info.json"), "utf8")

	if((metadata.app_type == "packaged" || metadata.app_type == "privileged") && metadata.package_path) {
		let package_name = Path.basename(new URL(metadata.package_path).pathname)
		let package_path = Path.join(app_path, package_name)

		if(Filesys.existsSync(package_path)) {
			let zip_blob = await Filesys.openAsBlob(package_path)

			let blob_reader = new Zip.BlobReader(zip_blob)
			let zip_reader = new Zip.ZipReader(blob_reader)
			let package_entries = await zip_reader.getEntries()
			let manifest_entry = package_entries.find(entry => entry.filename == "manifest.webapp")
			let manifest_text = await manifest_entry.getData(new Zip.TextWriter())
			let full = JSON.parse(manifest_text)

			await Filesystem.writeFile(app_path + "/full_manifest.json", manifest_text)

			if(metadata.app_type == "packaged") {
				let mini
				if(Filesys.existsSync(app_path + "/manifest.webapp")) {
					mini = JSON.parse(await Filesystem.readFile(app_path + "/manifest.webapp"), "utf8")
				} else {
					mini = { name: full.name, version: full.version, developer: full.developer, size: metadata.file_size }
				}
				mini.package_path = "/app/" + metadata.slug + "/" + package_name
				await Filesystem.writeFile(app_path + "/manifest.webapp", JSON.stringify(mini))

				let array_writer = new Zip.Uint8ArrayWriter("application/zip")
				let zip_writer = new Zip.ZipWriter(array_writer)

				for(let entry of package_entries) {
					if(entry.filename == "manifest.webapp") {
						let manifest_json = JSON.parse(await entry.getData(new Zip.TextWriter()))
						if(manifest_json.installs_allowed_from && manifest_json.installs_allowed_from.length && manifest_json.installs_allowed_from[0] != "*") {
							manifest_json.installs_allowed_from = ["*"]
						}
						await zip_writer.add("manifest.webapp", new Zip.TextReader(JSON.stringify(manifest_json)));
					} else if(!entry.filename.startsWith("META-INF/")) {
						await zip_writer.add(entry.filename, new Zip.BlobReader(await entry.getData(new Zip.BlobWriter())))
					}
				}
				await Filesystem.writeFile(package_path, await zip_writer.close())
			}
			await zip_reader.close()
		}
	} else if(metadata.app_type == "hosted") {
		try {
			let response = await fetch(metadata.manifest_url)
			if(response.ok) {
				let text = await response.text()
				JSON.parse(text)
				await Filesystem.writeFile(app_path + "/FFAA_manifest.json", text)
			}
		} catch(e) {}
	}
	await Filesystem.rename(app_path, Path.join(OUTPUT_FOLDER, metadata.slug))
}
for await(let image of Filesystem.glob(OUTPUT_FOLDER + "/**/*.png_modified=*")) {
	await Filesystem.rename(image, image.replace(/_modified=.*/, ""))
}