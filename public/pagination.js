"use strict"

/*var selects = document.querySelectorAll(".native_select")
selects.forEach(function(select) {
	select.addEventListener("change", function() {
		location.href = "../" + this.value
}) })*/

if(! ("open" in document.querySelector("details"))) {
	window.addEventListener("click", function(event) {
		if(event.target.nodeName == "SUMMARY") {
			var details = event.target.parentNode
			if(details.getAttribute("open") === "") {
				details.removeAttribute("open")
			} else {
				details.setAttribute("open", "")
	} } })
	document.body.classList.add("details_polyfill")
}

var supported = false
var test = Object.defineProperty({}, "inline", {
	get: function() { supported = true }
})
document.body.scrollIntoView(test)
if(supported) {
	var options = { inline: "center", container: "nearest", behavior: "instant" }
} else {
	var options = false
}

var navs = document.querySelectorAll("details")
function scroll_link(element) {
	element.querySelector("li.current").scrollIntoView(options)
}
scroll_link(navs[1])
scroll_link(navs[0])
window.addEventListener("load", function() {
	scroll_link(navs[1])
	scroll_link(navs[0])
})