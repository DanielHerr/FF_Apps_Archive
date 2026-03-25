var search = new PagefindUI({ element: "search", pageSize: 100 })

// trigger initial search from ?q= on page load
var params = new URLSearchParams(location.search)
if (params.has("q")) {
	search.triggerSearch(params.get("q"))
}

// Wire header search inputs (InputSearchBar instances) to the Pagefind instance
// so typing in the header updates results live on the search page.
document.querySelectorAll('.search-input').forEach(function (el) {
	el.addEventListener('input', function (e) {
		try {
			if (search && typeof search.triggerSearch === 'function') search.triggerSearch(e.target.value)
		} catch (err) {
			/* ignore if search isn't ready */
		}
	})
	// support native clear event
	el.addEventListener('search', function (e) {
		try {
			if (search && typeof search.triggerSearch === 'function') search.triggerSearch(e.target.value)
		} catch (err) {}
	})
})