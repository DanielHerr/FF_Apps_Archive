/* apply theme classes to html as selected */

if(navigator.install) {
	pwas_link.hidden = false
}

/* Reset search and nav toggles when crossing desktop breakpoint (769px) */
(function() {
	var desktopBreakpoint = 769;
	var wasDesktop = window.innerWidth >= desktopBreakpoint;
	
	window.addEventListener('resize', function() {
		var isDesktop = window.innerWidth >= desktopBreakpoint;
		
		// Reset state when crossing breakpoint in either direction
		if (isDesktop !== wasDesktop) {
			// Get elements
			var navPopover = document.getElementById('nav');
			var mobileSearchContent = document.querySelector('.mobile-search-content');
			
			// Add no-transition class to prevent animations during resize reset
			if (navPopover) navPopover.classList.add('no-transition');
			if (mobileSearchContent) mobileSearchContent.classList.add('no-transition');
			
			// Reset search toggle
			var searchToggle = document.getElementById('search_toggle_input');
			if (searchToggle && searchToggle.checked) {
				searchToggle.checked = false;
			}
			
			// Reset nav toggle (checkbox fallback)
			var navToggle = document.getElementById('nav_toggle_input');
			if (navToggle && navToggle.checked) {
				navToggle.checked = false;
			}
			
			// Close nav popover if open
			if (navPopover && navPopover.hidePopover && navPopover.matches(':popover-open')) {
				navPopover.hidePopover();
			}
			
			// Remove no-transition class after a frame
			requestAnimationFrame(function() {
				if (navPopover) navPopover.classList.remove('no-transition');
				if (mobileSearchContent) mobileSearchContent.classList.remove('no-transition');
			});
		}
		
		wasDesktop = isDesktop;
	});
})();

/* Legacy search unavailable elements (old header) */
if (typeof search_unavailable_label !== 'undefined') {
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
}

/* Search unavailable hover dialog */
(function() {
	var modal = document.getElementById('search_unavailable_modal');
	if (!modal) return;
	
	// Check if WebAssembly is available
	// Use ?wasm=disabled URL param to test disabled state
	var urlParams = new URLSearchParams(window.location.search);
	var forceDisabled = urlParams.get('wasm') === 'disabled';
	var wasmAvailable = !forceDisabled && typeof WebAssembly !== 'undefined' && 
		typeof WebAssembly.validate === 'function';
	
	if (wasmAvailable) return;
	
	// Disable search elements and set up hover listeners
	var searchBars = document.querySelectorAll('.search-bar-wrapper');
	var searchButtons = document.querySelectorAll('.button-search');
	
	var hideTimeout = null;
	
	function clearHideTimeout() {
		if (hideTimeout) {
			clearTimeout(hideTimeout);
			hideTimeout = null;
		}
	}
	
	function scheduleHide() {
		clearHideTimeout();
		hideTimeout = setTimeout(function() {
			if (modal.hidePopover) {
				modal.hidePopover();
			}
		}, 5000);
	}
	
	// Show modal helper
	function showModal() {
		clearHideTimeout();
		if (modal.showPopover) {
			modal.showPopover();
		}
	}
	
	// Set up hover (desktop) and click/tap (mobile) handlers
	function setupTrigger(element) {
		element.setAttribute('data-search-disabled', 'true');
		
		// Desktop: hover
		element.addEventListener('mouseenter', function() {
			showModal();
		});
		
		element.addEventListener('mouseleave', function(e) {
			// Don't schedule hide if moving to the modal itself
			if (e.relatedTarget && modal.contains(e.relatedTarget)) return;
			scheduleHide();
		});
		
		// Mobile: click/tap
		element.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			showModal();
		});
	}
	
	// Keep modal open when hovering over it, schedule hide on leave
	modal.addEventListener('mouseenter', function() {
		clearHideTimeout();
	});
	
	modal.addEventListener('mouseleave', function() {
		scheduleHide();
	});
	
	// Close modal when clicking outside
	document.addEventListener('click', function(e) {
		if (!modal.contains(e.target) && !e.target.hasAttribute('data-search-disabled')) {
			if (modal.hidePopover) {
				modal.hidePopover();
			}
		}
	});
	
	// Set up search bars
	searchBars.forEach(function(bar) {
		var input = bar.querySelector('input');
		if (input) {
			input.disabled = true;
		}
		setupTrigger(bar);
	});
	
	// Set up search buttons
	searchButtons.forEach(function(btn) {
		btn.disabled = true;
		setupTrigger(btn);
	});
})();