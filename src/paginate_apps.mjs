const characters = [ "1", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]

export function paginate(page, appsSource) {
	let apps = appsSource.filter(app => {
		let name = app.data.name["en-US"] ?? app.data.name.en ?? app.data.name[app.data.default_locale]
		let starting = name[0].toUpperCase()
		if(! characters.includes(starting)) {
			starting = "1"
		}
		return starting == page
	})

	const aIndex = 1
	let currentIndex = characters.indexOf(page)
	let prev = currentIndex > 0 ? characters[currentIndex - 1] : null
	let next = currentIndex < characters.length - 1 ? characters[currentIndex + 1] : null
	let cluster = []
	if(prev && characters.indexOf(prev) > aIndex) {
		cluster.push(prev)
	}
	if(characters.indexOf(page) > aIndex) {
		cluster.push(page)
	}
	if(next && characters.indexOf(next) > aIndex) {
		cluster.push(next)
	}
	let display = [characters[0], characters[1]]
	if(cluster.length > 0) {
		display.push("...")
		display = [...display, ...cluster]
	}
	if(! cluster.includes("Z")) {
		display.push("...")
		display.push("Z")
	}

	return { apps, prev, next, display }
}