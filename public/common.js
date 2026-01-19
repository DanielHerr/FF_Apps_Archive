/* apply theme classes to html as selected */

if(navigator.install) {
	pwas_link.hidden = false
}
search_unavailable_label.hidden = true
search_unavailable_close_label.hidden = true
if(! self.WebAssembly) {
	search_form.hidden = true
	search_toggle_label.hidden = true
	search_toggle_button.hidden = true
	search_unavailable_button.className = "visible"
	search_unavailable_close_button.className = "visible"

	if(search_unavailable_button.popoverTarget) {
		search_unavailable_button.popoverTarget = null
		search_unavailable_close_button.popoverTarget = null
	}
	if(! search_unavailable_button.commandFor) {
		search_unavailable_button.addEventListener("click", function() {
			search_unavailable.showModal()
		})
		search_unavailable_close_button.addEventListener("click", function() {
			search_unavailable.close()
		})
	}
	if(! self.HTMLDialogElement) {
		var script = document.createElement("script")
		script.src = "/dialog_polyfill.js"
		script.addEventListener("load", function() {
			dialogPolyfill.registerDialog(search_unavailable)
		})
		document.head.appendChild(script)
	}
}