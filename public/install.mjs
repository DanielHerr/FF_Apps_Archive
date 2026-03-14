if(navigator.install) {
	install_button.disabled = false
}

var id = install_button.dataset.pwaId
var page = install_button.dataset.pwaPage

install_button.addEventListener("click", async function() {
	try {
		if(id) {
			await navigator.install(page, id)
		} else {
			await navigator.install(page)
		}
		install_button.textContent = "Launch"
	} catch(error) {
		if(error.name != "AbortError") {
		alert("An error occurred while installing: " + error.message)
} } })