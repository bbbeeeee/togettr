
var Validation = function(){};
Validation.prototype = {
	username: function(username){
		return /^[a-zA-Z0-9_]+$/.test(username);
	},
	password: function(password){
		/*
			^                         Start anchor
			(?=.*[A-Z])        				Ensure string has 1 uppercase letters.
			(?=.*[!@#$&*])            Ensure string has 1 special case letter.
			(?=.*[0-9])       				Ensure string has 1 digits.
			(?=.*[a-z]) 							Ensure string has 1 lowercase letters.
			.{8}                      Ensure string is of length 8.
			$                         End anchor.
		*/

		//return /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(password);

		return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(password);
	},
	email: function(email){
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}
}
var validate = new Validation();

