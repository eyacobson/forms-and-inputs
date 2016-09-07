var formElement = document.getElementsByTagName("form")[0];
var nameField = formElement.elements.name;
var ccnum = formElement.elements.ccnum;
var csv = formElement.elements.csv;
var error1 = document.getElementById("error1");
var error2 = document.getElementById("error2");
var error3 = document.getElementById("error3");

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

nameField.addEventListener("input", function(event) {
	if (validator.isOfLength(this.value, 2) || validator.isEmpty(this.value)) {
		error1.style.display = "none";
		this.setCustomValidity("");
	} else {
		error1.style.display = "block";
	}
});

ccnum.addEventListener("input", function(event) {
	if (validator.isCreditCard(this.value) || validator.isEmpty(this.value)) {
		error2.style.display = "none";
		this.setCustomValidity("");
	} else {
		error2.style.display = "block";
	}
});

csv.addEventListener("input", function(event) {
	if ((!isNaN(this.value) && this.value.length === 3) || validator.isEmpty(this.value)) {
		error3.style.display = "none";
		this.setCustomValidity("");
	} else {
		error3.style.display = "block";
	}
});

formElement.addEventListener("submit", function(event) {
	if (!validator.isOfLength(nameField.value, 2)) {
		event.preventDefault();
		nameField.setCustomValidity("Name must be at least 2 characters long.");
		this.reportValidity();
	} else {
		nameField.setCustomValidity("");
	}

	if (!validator.isCreditCard(ccnum.value)) {
		event.preventDefault();
		ccnum.setCustomValidity("Credit card number is not valid. Make sure it is alphanumeric and uses a - separator or none at all.");
		this.reportValidity();
	} else {
		ccnum.setCustomValidity("");
	}

	if ((isNaN(csv.value) || csv.value.length !== 3) && !validator.isEmpty(csv.value)) {
		event.preventDefault();
		csv.setCustomValidity("CSV number not valid.");
		this.reportValidity();
	} else {
		csv.setCustomValidity("");
	}
});