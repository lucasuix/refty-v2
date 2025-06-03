import {toast} from './components/toast.js';

export async function sendRequest(payload) {
	return await eel.sendPayload(payload)();
}

export function send(payload, rebound) {
	sendRequest(payload)
	.then(response => {
			return JSON.parse(response);
	})
	.then(data =>{
		toast.accuse(data.toast);
		data.success ? rebound(data.rft) : null;
	})
	.catch(error =>{
		console.log(error);
		toast.accuse("Um erro ocorreu ao enviar dados");
	});
}