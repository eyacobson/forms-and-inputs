var signup = document.getElementById("signup");
var email = signup.elements.email;
var firstName = signup.elements.first_name;
var lastName = signup.elements.last_name;
var dob = signup.elements.dob;
var password = signup.elements.password;

//For date element validation
var minDate = new Date();
var today = new Date().toJSON().slice(0,10);
minDate.setFullYear(minDate.getFullYear() - 13);

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

//NOTE: input event doesn't exist prior to IE9 & Safari 5
email.addEventListener("input", function(event) {
	if (validator.isEmailAddress(this.value) || validator.isEmpty(this.value)) {
		this.className = "";
		this.setCustomValidity("");
	} else {
		this.className = "invalid";
	}
});

firstName.addEventListener("input", function(event) {
	if (validator.isOfLength(this.value, 2) || validator.isEmpty(this.value)) {
		this.className = "";
		this.setCustomValidity("");
	} else {
		this.className = "invalid";
	}
});

lastName.addEventListener("input", function(event) {
	if (validator.isOfLength(this.value, 2) || validator.isEmpty(this.value)) {
		this.className = "";
		this.setCustomValidity("");
	} else {
		this.className = "invalid";
	}
});

dob.addEventListener("input", function(event) {
	if (validator.isBeforeDate(this.value, minDate)) {
		this.className = "";
		this.setCustomValidity("");
	} else {
		this.className = "invalid";
	}
});

password.addEventListener("input", function(event) {
	if (validator.isOfLength(this.value, 6)) {
		this.className = "";
		this.setCustomValidity("");
	} else {
		this.className = "invalid";
	}
});

signup.addEventListener("submit", function(event) {
	if (!validator.isOfLength(firstName.value, 2)) {
		event.preventDefault();
		firstName.setCustomValidity("Name must be 2 or more characters.");
		this.reportValidity(); //Note this method is used on the FORM
	} else {
		firstName.setCustomValidity("");
	}

	if (!validator.isOfLength(lastName.value, 2)) {
		event.preventDefault();
		lastName.setCustomValidity("Name must be 2 or more characters.");
		this.reportValidity();
	} else {
		lastName.setCustomValidity("");
	}

	if (!validator.isEmailAddress(email.value)) {
		event.preventDefault();
		email.setCustomValidity("This email is unacceptable. You have incurred 5 citizenship demerits.");
		this.reportValidity();
	} else {
		email.setCustomValidity("");
	}

	if (!validator.isBeforeDate(dob.value, minDate) || validator.isAfterDate(dob.value, today)) {
		event.preventDefault();

		if (validator.isAfterDate(dob.value, today)) {
			dob.setCustomValidity("You are from the future. A temporal paradox counselor has been deployed to your location.");
			this.reportValidity();
		} else if (!validator.isBeforeDate(dob.value, minDate)) {
			dob.setCustomValidity("You must be at least 13 years of age to have your information harvested.");
			this.reportValidity();
		} else {
			dob.setCustomValidity("");
		}
	}

	if (!validator.isOfLength(password.value, 6)) {
		event.preventDefault();
		password.setCustomValidity("Password must be at least 6 characters long.");
		this.reportValidity();
	} else {
		password.setCustomValidity("");
	}
});