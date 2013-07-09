exports.validateUsername = function(username){
	return /^[a-zA-Z0-9_]+$/.test(username);
};

exports.validatePassword = function(password){
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
}

exports.checkEmail = function(email){
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}