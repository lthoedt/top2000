const sendStatus = (res, status, message) => {
	const response = {
		success: false
	}
	switch (status) {
		case 404:
			response.message = (message) ? message :"Not found.";
			break;
		case 500:
			response.message = (message) ? message :"Server error occurred";
			break;
		case 412:
			response.message = (message) ? message : "Missing expected content";
			break;
		case 200:
			response.message = (message) ? message : "Succes!";
			response.success = true; 
			break;
	}

	return res.status(status).json(response);
}

module.exports = {
	sendStatus
}