var textInput = document.querySelector("input[type=text]");
var other = document.getElementById("fish_choice5");
var error = document.getElementsByTagName("span")[1];
var choices = document.querySelectorAll(".choice");

textInput.addEventListener("input", function(event) {
	if (other.checked === true && validator.isEmpty(this.value)) {
		error.style.display = "block";
	} else {
		error.style.display = "none";
	}
});

//This is b/c change event doesn't fire on UNSELECTING radio button
for (var i = 0; i < choices.length; i++) {
	choices[i].addEventListener("click", function(event) {
		if (other.checked === false) {
			error.style.display = "none";
		}
	});
}

//On SELECTING radio button
other.addEventListener("change", function(event) {
	if (validator.isEmpty(textInput.value)) {
		error.style.display = "block";
	}
});