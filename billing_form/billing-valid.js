var fields = document.querySelectorAll("input[type=text]");
var fields1 = Array.prototype.slice.call(fields, 0, 6);
var fields2 = Array.prototype.slice.call(fields, 5, 12);
var error1 = document.getElementById("error1");
var error2 = document.getElementById("error2");

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

for (var i = 0; i < fields1.length; i++) {
	fields1[i].addEventListener("input", function(event) {
		var classes = [];
		if (validator.isTrimmed(this.value) || validator.isEmpty(this.value)) {
			this.className = "";
			this.setCustomValidity("");
		} else {
			this.className = "invalid";
		}

		for (var j = 0; j < fields1.length; j++) {
			if (fields1[j].className === "invalid") {
				classes.push("invalid");
			} else {
				classes.push("valid");
			}
		}

		if (classes.indexOf("invalid") !== -1) {
			error1.style.display = "inline";
		} else {
			error1.style.display = "none";
		}
	});
}

for (var i = 0; i < fields2.length; i++) {
	fields2[i].addEventListener("input", function(event) {
		var classes = [];
		if (validator.isTrimmed(this.value) || validator.isEmpty(this.value)) {
			this.className = "";
			this.setCustomValidity("");
		} else {
			this.className = "invalid";
		}

		for (var j = 0; j < fields2.length; j++) {
			if (fields2[j].className === "invalid") {
				classes.push("invalid");
			} else {
				classes.push("valid");
			}
		}

		if (classes.indexOf("invalid") !== -1) {
			error2.style.display = "inline";
		} else {
			error2.style.display = "none";
		}
	});
}