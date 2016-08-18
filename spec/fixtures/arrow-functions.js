function getVerifiedToken(selector) {
	return getUsers(selector)
		.then(users => users[0])
		.then(verifyUser)
		.then((user, verifiedToken) => verifiedToken)
		.catch(err => log(err.stack));
}
