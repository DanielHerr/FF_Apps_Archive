"use strict"

install_button.addEventListener("click", function() {
	if(this.dataset.manifest == "manifest.webapp") {
		var request = navigator.mozApps.installPackage(location.href + this.dataset.manifest)
		request.addEventListener("success", function(event) {
			console.log(event)
		})
		request.addEventListener("error", function(event) {
			console.log(event)
		})
	} else {
		navigator.mozApps.install(this.dataset.manifest)
	}
})