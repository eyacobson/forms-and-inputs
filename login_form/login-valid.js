var username = document.getElementById("username");
var password = document.getElementById("password");
var email = document.getElementById("email");
var loginForm = document.getElementsByTagName("form")[0];

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


username.addEventListener("input", function(event) {
	if (validator.isTrimmed(this.value) || validator.isEmpty(this.value)) {
		this.style.borderBottomColor = "black";
		this.setCustomValidity("");
	} else {
		this.style.borderBottomColor = "red";
	}
});

password.addEventListener("input", function(event) {
	if (validator.isOfLength(this.value, 6) || validator.isEmpty(this.value)) {
		this.style.borderBottomColor = "black";
		this.setCustomValidity("");
	} else {
		this.style.borderBottomColor = "red";
	}
});

email.addEventListener("input", function(event) {
	if (validator.isEmailAddress(this.value) || validator.isEmpty(this.value)) {
		this.style.borderBottomColor = "black";
		this.setCustomValidity("");
	} else {
		this.style.borderBottomColor = "red";
	}
});

loginForm.addEventListener("submit", function(event) {
	if (!validator.isTrimmed(username.value)) {
		event.preventDefault();
		username.setCustomValidity("Please supply a username without leading, trailing, or internal extra spaces.");
		this.reportValidity();
	} else if (validator.isEmpty(username.value)) {
		event.preventDefault();
		username.setCustomValidity("Please supply a username.");
	} else if (validator.isTrimmed(username.value) && !validator.isEmpty(username.value)) {
		username.setCustomValidity("");
	}

	if (!validator.isOfLength(password.value, 6)) {
		event.preventDefault();
		password.setCustomValidity("Password must be at least 6 characters long.");
		this.reportValidity();
	} else {
		password.setCustomValidity("");
	}

	if (!validator.isEmailAddress(email.value)) {
		event.preventDefault();
		email.setCustomValidity("Please enter a valid email.");
		this.reportValidity();
	} else {
		email.setCustomValidity("");
	}
});