module.exports.isuserloggedin = () => {
	if (localStorage.getItem("userID")) {
		return localStorage.getItem("userID");
	} else return null;
};
module.exports.logOut = () => {
	if (localStorage.getItem("userID")) {
		localStorage.removeItem("userID", { path: "/" });
	}
};
module.exports.logIn = userID => {
	localStorage.setItem("userID", userID);
};
