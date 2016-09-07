var schedulingForm = document.getElementsByTagName("form")[0];
var appdate = schedulingForm.elements.date;
var timeField = schedulingForm.elements.time;
var nameField = schedulingForm.elements.name;
var phoneField = schedulingForm.elements.phone;
var email = schedulingForm.elements.email;

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

appdate.addEventListener("input", function(event) {
	var today = new Date().toJSON().slice(0,10);

	if (validator.isEmpty(this.value)) {
		this.className = "";
		this.setCustomValidity("Please provide a date.");
	} else if (navigator.userAgent.indexOf("irefox") !== -1 && this.value.indexOf("-") !== -1) { //Detecting Firefox here
		this.className = "invalid";
		this.setCustomValidity("Please use / as a separator, not -");
	} else if (validator.isAfterDate(this.value, today)) {
		this.className = "";
		this.setCustomValidity("");
	} else if (!validator.isEmpty(this.value) && !validator.isAfterDate(this.value, today)) {
		this.className = "invalid";
		this.setCustomValidity("You are attempting to schedule an appointment for today or earlier. Please pick a later date.");
	}
});

timeField.addEventListener("input", function(event) {
	if (/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/.test(this.value) === false && !validator.isEmpty(timeField.value)) {
		this.className = "invalid";
		this.setCustomValidity("Please use a time format like '01:15 AM' or '1:15 PM', etc.");
	} else if (validator.isEmpty(timeField.value)) {
		this.className = "";
		this.setCustomValidity("Please provide a time.");
	} else {
		this.className = "";
		this.setCustomValidity("");
	}
});

nameField.addEventListener("input", function(event) {
	if (validator.isOfLength(this.value, 2) || validator.isEmpty(this.value)) {
		this.className = "";
		this.setCustomValidity("");
	} else {
		this.className = "invalid";
	}
});

phoneField.addEventListener("input", function(event) {
	if (validator.isPhoneNumber(this.value) || validator.isEmpty(this.value)) {
		this.className = "";
		this.setCustomValidity("");
	} else {
		this.className = "invalid";
	}
});

email.addEventListener("input", function(event) {
	if (validator.isEmailAddress(this.value) || validator.isEmpty(this.value)) {
		this.className = "";
		this.setCustomValidity("");
	} else {
		this.className = "invalid";
	}
});

schedulingForm.addEventListener("submit", function(event) {
	var today = new Date().toJSON().slice(0,10);

	if (validator.isEmpty(appdate.value)) {
		event.preventDefault();
		appdate.setCustomValidity("Please provide a date.");;
		this.reportValidity();
	} else if (!validator.isAfterDate(appdate.value, today) && !validator.isEmpty(appdate.value)) {
		event.preventDefault();
		appdate.setCustomValidity("Please use a time format like '01:15 AM' or '1:15 PM', etc.");
		this.reportValidity();
	} else if (validator.isAfterDate(appdate.value, today) && validator.isEmpty(appdate.value)) {
		appdate.setCustomValidity("");
	}

	if (/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/.test(timeField.value) === false && !validator.isEmpty(timeField.value)) {
		event.preventDefault();
		timeField.setCustomValidity("Please use a time format like '01:15 AM' or '1:15 PM', etc.");
		this.reportValidity();
	} else if (validator.isEmpty(timeField.value)) {
		event.preventDefault()
		timeField.setCustomValidity("Please provide a time.");
		this.reportValidity();
	} else if (/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/.test(timeField.value)) {
		timeField.setCustomValidity("");
	}

	if (!validator.isOfLength(nameField.value, 2)) {
		event.preventDefault();
		nameField.setCustomValidity("Name must be 2 or more characters.");
		this.reportValidity();
	} else {
		nameField.setCustomValidity("");
	}

	if (!validator.isPhoneNumber(phoneField.value) && !validator.isEmpty(phoneField.value)) {
		event.preventDefault();
		phoneField.setCustomValidity("Phone number does not appear to be valid.");
		this.reportValidity();
	} else if (validator.isEmpty(phoneField.value)) {
		event.preventDefault();
		phoneField.setCustomValidity("Please provide a phone number.");
		this.reportValidity();
	} else {
		phoneField.setCustomValidity("");
	}

	if (!validator.isEmailAddress(email.value)) {
		event.preventDefault();
		email.setCustomValidity("Please provide a valid email.");
		this.reportValidity();
	} else {
		email.setCustomValidity("");
	}
});