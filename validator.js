(function(window) {
	var validator = {};

	validator.isEmailAddress = function(input) {
		if ((!input) || (typeof input != "string")) {
			return false;
		}

		var cond1 = (input.indexOf("@") < 1) || (input.indexOf("@") 
			=== input.length - 1) ? 0 : 1;

		var cond2 = (input.indexOf(".") < 1) || (input.indexOf(".") 
			=== input.length - 1) ? 0 : 1;

		var cond3 = input.indexOf("@") != input.lastIndexOf("@") ?
			0 : 1;

		var cond4 = input.indexOf(".") != input.lastIndexOf(".") ?
			0 : 1;

		var cond5 = ["com", "edu", "net", "gov", "co"].indexOf(
			input.split(".")[1]) === -1 ? 0 : 1;

		if (cond1 && cond2 && cond3 && cond4 && cond5) {
			return true;
		} else {
			return false;
		}
	}

	validator.isPhoneNumber = function(input) {
		var separator;

		if (!input || typeof input !== "string") {
			return false;
		} //check that input exists & is a string

		if ([10, 11, 12, 14].indexOf(input.length) === -1) {
			return false;
		} //check if input length is one of the 4 legit lengths

		if ([10, 11].indexOf(input.length) !== -1 && isNaN(input) ===
			true) {
			return false;
		} //make sure it's all numbers, if length implies no separator

		if ([12, 14].indexOf(input.length) != -1 && input.indexOf(".")
			!== -1) {
			separator = ".";
		} else if ([12, 14].indexOf(input.length) !== -1 &&
			input.indexOf("-") !== -1) {
			separator = "-";
		} //if there's a valid separator, get it

		if ([11, 14].indexOf(input.length) !== -1 && input[0] !== "1") {
			return false;
		} //if there's a country code, make sure it's 1

		if (input.length === 12 &&
			(input.split(separator).length !== 3 ||

			isNaN(input.split(separator)[0]) === true ||
			input.split(separator)[0].length !== 3 ||

			isNaN(input.split(separator)[1]) === true ||
			input.split(separator)[1].length !== 3 ||

			isNaN(input.split(separator)[2]) === true ||
			input.split(separator)[2].length !== 4)) {

			return false;
		} //validate format "XXX.XXX.XXXX" or "XXX-XXX-XXXX"

		if (input.length === 14 &&
			(input.split(separator).length !== 4 ||

			isNaN(input.split(separator)[0]) === true ||
			input.split(separator)[0].length !== 1 ||

			isNaN(input.split(separator)[1]) === true ||
			input.split(separator)[1].length !== 3 ||

			isNaN(input.split(separator)[2]) === true ||
			input.split(separator)[2].length !== 3 ||

			isNaN(input.split(separator)[3]) === true ||
			input.split(separator)[3].length !== 4)) {

			return false;
		} //validate format "X.XXX.XXX.XXXX" or "X-XXX-XXX-XXXX"

		return true;
	}

	validator.withoutSymbols = function(input) {
		var char, char2, i;
		var result = "";

		for (i = 0; i < input.length; i++) {
			char = input.charAt(i);
			char2 = char.toUpperCase();

			if (char !== char2 || char === " " || +char === Number(char)
				|| char !== char2.toLowerCase()) {
				result = result + char;
			}
		}

		while (result.indexOf("  ") !== -1) {
			result = result.replace("  ", " ");
		}

		return result;
	}

	validator.isDate = function(input) {
		return !isNaN(Date.parse(input));
	}

	validator.isBeforeDate = function(input, reference) {
		try {
			if (typeof input === "string") {
				input = new Date(input);
			}

			if (typeof reference === "string") {
				reference = new Date(reference);
			}

			if (isNaN(Date.parse(input)) || isNaN(Date.parse(reference))) {
				throw err;
			}

			return input < reference;
		} catch(err) {
			if (isNaN(Date.parse(input)) && !isNaN(Date.parse(
				reference))) {
				console.log("First argument is not a valid date.");
			} else if (!isNaN(Date.parse(input)) && isNaN(Date.parse(
				reference))) {
				console.log("Second argument is not a valid date.");
			} else {
				console.log("Both arguments are invalid dates.");
			}
		}
	}

	validator.isAfterDate = function(input, reference) {
		try {
			if (typeof input === "string") {
				input = new Date(input);
			}

			if (typeof reference === "string") {
				reference = new Date(reference);
			}

			if (isNaN(Date.parse(input)) || isNaN(Date.parse(reference))) {
				throw err;
			}

			return input > reference;
		} catch(err) {
			if (isNaN(Date.parse(input)) && !isNaN(Date.parse(
				reference))) {
				console.log("First argument is not a valid date.");
			} else if (!isNaN(Date.parse(input)) && isNaN(Date.parse(
				reference))) {
				console.log("Second argument is not a valid date.");
			} else {
				console.log("Both arguments are invalid dates.");
			}
		}
	}

	validator.isBeforeToday = function(input) {
		try {
			if (typeof input === "string") {
				input = new Date(input);
			}

			if (isNaN(Date.parse(input))) {
				throw err;
			}

			var today = new Date();

			var inputDay = input.getDate(),
			    inputMonth = input.getMonth(),
			    inputYear = input.getFullYear();

			var todayDay = today.getDate(),
			    todayMonth = today.getMonth(),
			    todayYear = today.getFullYear();

			if ((inputYear < todayYear) || (inputYear == todayYear &&
				inputMonth < todayMonth) || (inputYear == todayYear &&
				inputMonth == todayMonth && inputDay < todayDay)) {
				return true;
			} else {
				return false;
			}
		} catch(err) {
			console.log("Input parameter is not a valid date.");
		}
	}

	validator.isAfterToday = function(input) {
		try {
			if (typeof input === "string") {
				input = new Date(input);
			}

			if (isNaN(Date.parse(input))) {
				throw err;
			}

			var today = new Date();

			var inputDay = input.getDate(),
			    inputMonth = input.getMonth(),
			    inputYear = input.getFullYear();

			var todayDay = today.getDate(),
			    todayMonth = today.getMonth(),
			    todayYear = today.getFullYear();

			if ((inputYear > todayYear) || (inputYear == todayYear &&
				inputMonth > todayMonth) || (inputYear == todayYear &&
				inputMonth == todayMonth && inputDay > todayDay)) {
				return true;
			} else {
				return false;
			}
		} catch(err) {
			console.log("Input parameter is not a valid date.");
		}
	}

	validator.isEmpty = function(input) {
		var i;

		if (!input || input === "") {
			return true;
		}

		for (i = 0; i < input.length; i++) {
			if (" \n\t\r\v".indexOf(input[i]) === -1) {
				return false;
			}
		}

		return true;
	}

	validator.contains = function(input, words) {
		var char, char2, i, j;
		var punctuation = "";
		input = input.toLowerCase();

		for (i = 0; i < input.length; i++) {
			char = input.charAt(i);
			char2 = char.toUpperCase();

			if (char === char2 && isNaN(char)) {
				punctuation = punctuation + char;
			}
		}

		for (i = 0; i < punctuation.length; i++) {
			input = input.split(punctuation[i]).join(" ");
		}

		while (input.indexOf("  ") !== -1) {
			input = input.replace("  ", " ");
		}

		input = input.split(" ");

		for (i = 0; i < words.length; i++) {
			if (input.indexOf(words[i]) !== -1 && words[i] !== "") {
				return true;
			}
		}

		return false;
	}

	validator.lacks = function(input, words) {
		var char, char2, i, j;
		var punctuation = "";
		input = input.toLowerCase();

		for (i = 0; i < input.length; i++) {
			char = input.charAt(i);
			char2 = char.toUpperCase();

			if (char === char2 && isNaN(char)) {
				punctuation = punctuation + char;
			}
		}

		for (i = 0; i < punctuation.length; i++) {
			input = input.split(punctuation[i]).join(" ");
		}

		while (input.indexOf("  ") !== -1) {
			input = input.replace("  ", " ");
		}

		input = input.split(" ");

		for (i = 0; i < words.length; i++) {
			if (input.indexOf(words[i]) > -1 && words[i] !== "") {
				return false;
			}
		}

		return true;
	}

	validator.isComposedOf = function(input, strings) {
		try {
			if (typeof input !== "string" || strings.constructor 
				!== Array) {
				throw err;
			}

			var i, errflag;
			for (i = 0; i < strings.length; i++) {
				if (typeof strings[i] !== "string") {
					errflag = 1;
					throw err;
				}
			}

			input = input.toLowerCase.split(" ").join("");
			input = validator.withoutSymbols(input);

			strings = strings.sort(function(a, b) {
				return b.length - a.length;
			});

			for (i = 0; i < strings.length; i++) {
				input = input.split(strings[i].toLowerCase()).join("");
			}

			return input === "";
		} catch(err) {
			if (typeof input !== "string" && strings.constructor ===
				Array) {
				console.log("First argument is not a string.");
			} else if (typeof input === "string" && strings.constructor
				!== Array) {
				console.log("Second argument is not an array.");
			} else if (typeof input !== "string" && strings.constructor
				!== Array) {
				console.log("Both argument are erroneous.");
			}

			if (errflag === 1) {
				console.log(
					"Oh noes, array argument contains non-strings!");
			}
		}
	}

	validator.isLength = function(input, n) {
		return input.length <= n;
	}

	validator.isOfLength = function(input, n) {
		return input.length >= n;
	}

	validator.countWords = function(input) {
		var char, char2, i, j;
		var symbols = "";
		input = input.toLowerCase();

		//Identify symbols (non-alphanumeric characters)
		for (i = 0; i < input.length; i++) {
			char = input.charAt(i);
			char2 = char.toUpperCase();

			if ((char === char2 || char === " " || isNaN(char)) &&
				char !== "'") {
				symbols = symbols + char;
			}
		}

		//Iteratively remove symbols
		for (i = 0; i < symbols.length; i++) {
			input = input.split(symbols[i]).join(" ");
		}

		//Remove extra spaces caused by symbols removal
		while (input.indexOf("  ") !== -1) {
			input = input.replace("  ", " ");
		}

		//Create final array of true words (+ potentially, empty strings)
		input = input.split(" ");

		//Remove empty strings from array
		for (i = 0; i < input.length; i++) {
			if (input[i] === "") {
				input.splice(i, 1);
			}
		}

		return input.length;
	}

	validator.lessWordsThan = function(input, n) {
		return validator.countWords(input) <= n;
	}

	validator.moreWordsThan = function(input, n) {
		return validator.countWords(input) >= n;
	}

	validator.isBetween = function(input, floor, ceil) {
		var wordCount = validator.countWords(input);
		return (floor <= wordCount) && (wordCount <= ceil);
	}

	validator.isAlphanumeric = function(input) {
		var i, charCode;

		for (i = 0; i < input.length; i++) {
			charCode = input.charCodeAt(i);

			if (!(charCode >= 48 && charCode <= 57) && !(charCode >=
				65 && charCode <= 90) && !(charCode >= 97 && charCode
				<= 122)) {
				return false;
			}
		}

		return true;
	}

	validator.isCreditCard = function(input) {
		if (input.length !== 16 && input.length !== 19) {
			return false;
		} else if (input.length === 16) {
			return validator.isAlphanumeric(input);
		} else if (input.length === 19) {
			var splitInput = input.split("-");

			if (splitInput.length !== 4) {
				return false;
			} else {
				var i;
				for (i = 0; i < splitInput.length; i++) {
					if (!validator.isAlphanumeric(splitInput[i])) {
						return false;
					}
				}
				return true;
			}
		}
	}

	validator.isHex = function(input) {
		if (input[0] !== "#" || (input.length !== 7 && input.length
			!== 4)) {
			return false;
		} else {
			var i, charCode;

			for (i = 0; i < input.length; i++) {
				charCode = input.charCodeAt(i);

				if (!(charCode >= 48 && charCode <= 57) && !(charCode
					>= 65 && charCode <= 70) && !(charCode >= 97 &&
					charCode <= 102)) {
					return false;
				}
			}

			return true;
		}
	}

	validator.isRGB = function(input) {
		if (input.slice(0, 4) !== "rgb(" || input.slice(
			input.length - 1) !== ")") {
			return false;
		} else {
			var numbersOnly = input.slice(4, input.length - 1);
			var numArray = numbersOnly.split(",");

			if (numArray.length > 3) {
				return false;
			}

			var i;
			for (i = 0; i < numArray.length; i++) {
				if (isNaN(numArray[i]) || numArray[i] < 0 ||
					numArray[i] > 255) {
					return false;
				}
			}

			return true;
		}
	}

	validator.isHSL = function(input) {
		if (input.slice(0, 4) !== "hsl(" || input.slice(
			input.length - 1) !== ")") {
			return false;
		} else {
			var numbersOnly = input.slice(4, input.length - 1);
			var numArray = numbersOnly.split(",");

			if (numArray.length > 3) {
				return false;
			}

			var i;
			var cond1 = isNaN(numArray[0]) || numArray[0] < 0 ||
						numArray[0] > 360;
			var cond2 = isNaN(numArray[1]) || numArray[1] < 0 ||
						numArray[1] > 1;
			var cond3 = isNaN(numArray[2]) || numArray[2] < 0 ||
						numArray[2] > 1;

			if (cond1 || cond2 || cond3) {
				return false;
			}

			return true;
		}
	}

	validator.isColor = function(input) {
		return validator.isHex(input) || validator.isRGB(input) ||
			validator.isHSL(input);
	}

	validator.isTrimmed = function(input) {
		return input.indexOf("  ") === -1 && input[0] !== " " &&
			input[input.length - 1] !== " ";
	}

	window.validator = validator;	//Expose to global
})(window);