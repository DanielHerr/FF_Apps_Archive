var search = new PagefindUI({ element: "search", pageSize: 100 })

var params = new URLSearchParams(location.search)
if(params.has("q")) {
	search.triggerSearch(params.get("q"))
}