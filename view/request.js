export async function sendRequest(payload) {
	return await eel.sendPayload(payload)();
}

export async function fetchRequest(endpoint, token) {
	console.log(token);
	fetch('https://ppc.tecsci.com.br/api/v1.0/' + endpoint, {
		method: "GET",
		headers: {"Authorization": "Bearer " + token}
	})
	.then(response => {
		return response.json();
	})
	.then(data => {
		console.log(data);
		return data;
	})
	.catch(error => {
		console.log(error);
		return null;
	});
}

export async function fetchToken() {
	fetch('https://ppc.tecsci.com.br/api/v1.0/auth/login', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			username: "lucas.villani",
			password: "12345678"
		})
	})
	.then(response => {
		return response.json();
	})
	.then(data => {
		console.log(data);
		return data.access_token;
	})
	.catch(error => {
		console.log(error);
		return null;
	});
}