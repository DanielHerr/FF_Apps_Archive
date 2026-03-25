"use strict"

var manifest = install_button.dataset.manifest
var app

if(navigator.mozApps) {
	if(manifest == "manifest.webapp") {
		var check = navigator.mozApps.checkInstalled(location.href + manifest)
		check.addEventListener("success", function() {
			if(this.result) {
				app = this.result
				install_button.textContent = install_button.textContent.replace("Install", "Launch")
		} })
	} else {
		var check = navigator.mozApps.getInstalled()
		check.addEventListener("success", function() {
			app = this.result.find(function(app) {
				return app.manifestURL == manifest
			})
			if(app) {
				install_button.textContent = install_button.textContent.replace("Install", "Launch")
	} }) }
	check.addEventListener("error", function() {
		console.error(this.error)
	})
	install_button.disabled = false
}

install_button.addEventListener("click", function() {
	if(install_button.textContent.indexOf("Install") == 0) {
		if(manifest == "manifest.webapp") {
			var install = navigator.mozApps.installPackage(location.href + manifest)
		} else {
			var install = navigator.mozApps.install(manifest)
		}
		install.addEventListener("success", function() {
			app = this.result
			install_button.textContent = install_button.textContent.replace("Install", "Launch")
		})
		install.addEventListener("error", function() {
			console.error(this.error)
			if(this.error.name == "REINSTALL_FORBIDDEN") {
				install_button.textContent = install_button.textContent.replace("Install", "Launch")
				install_button.disabled = true
			} else if(this.error.name != "DENIED") {
				alert("An error occurred while installing: " + this.error.name)
			}
		})
	} else if(install_button.textContent.indexOf("Launch") == 0) {
		app.launch()
} })