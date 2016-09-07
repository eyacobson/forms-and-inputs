var searchForm = document.getElementsByTagName("form")[0];
var searchBar = searchForm.elements.search;

//Polyfill for non-Chrome, which do not have .reportValidity()
if (!HTMLFormElement.prototype.reportValidity) {
	HTMLFormElement.prototype.reportValidity = function() {
		this.noValidate = false;
		var submitButtons = document.querySelectorAll("button, input[type=submit]");
		for (var i = 0; i < submitButtons.length; i++) {
			if (submitButtons[i].type === "submit") {
				submitButtons[i].click();
				return;
			}
		}
	}
}

searchBar.addEventListener("input", function(event) {
	if (!validator.isEmpty(this.value)) {
		this.setCustomValidity("");
	}
});

searchForm.addEventListener("submit", function(event) {
	if (validator.isEmpty(searchBar.value)) {
		event.preventDefault();
		searchBar.setCustomValidity("Please input a search before submitting.");
		this.reportValidity();
	} else {
		searchBar.setCustomValidity("");
	}
});