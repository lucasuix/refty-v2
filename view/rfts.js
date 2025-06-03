import {Button} from './components/button.js';
import {Select} from './components/select.js';
import {TextInput} from './components/input.js';
import {TextArea} from './components/textarea.js';
import {toast} from './components/toast.js';
import {sendRequest, fetchRequest} from './request.js';

export class NovaRFT {
	constructor() {

		this.serialnumber = new TextInput('Número de série', 'nova-rft-serialnumber');
		this.operador_id = new Select('Operador', 'nova-rft-operador', false, 'operador');
		this.etapa = new Select('Etapa', 'nova-rft-etapa', false, 'etapa');
		this.erro_id = new Select('Erro', 'nova-rft-erro', false, 'erro');

		this.cancelar = new Button('Cancelar', ['btn-danger'], 'nova-rft-cancelar');
		this.enviar_rft = new Button('Enviar RFT', ['btn-success'], 'nova-rft-enviar');

		this.cancelar.button.addEventListener('click', () => this.clear());
		this.enviar_rft.button.addEventListener('click', () => this.send_rft());
	}

	render_body(frame_id) {
		this.serialnumber.render(frame_id);
		this.operador_id.render(frame_id);
		this.etapa.render(frame_id);
		this.erro_id.render(frame_id);
	}

	render_footer(frame_id) {
		this.cancelar.render(frame_id);
		this.enviar_rft.render(frame_id);
	}

	generate_data() {
		return {
			"serialNumber": this.serialnumber.getValue(),
			"operadorID": this.operador_id.getValue(),
			"stage": this.etapa.getValue(),
			"erro_id": this.erro_id.getValue()
		}
	}

	soft_clear() {
		this.serialnumber.clear();
	}

	clear() {
		this.serialnumber.clear();
		this.operador_id.clear();
		this.etapa.clear();
		this.erro_id.clear();
	}

	send_rft() {
		const payload = {
			"rft": this.generate_data(),
			"metadata": {
				"action": "nova_rft"
			}
		}

		sendRequest(payload)
		.then(response => {
			return JSON.parse(response);
		})
		.then(data =>{
			toast.accuse(data.toast);
			data.success ? this.soft_clear() : null;
		})
		.catch(error =>{
			console.log(error);
			toast.accuse("Um erro ocorreu ao enviar a RFT");
		});
	}

}

export class ManutencaoRFT {
	constructor() {

		this.search_rft = new TextInput('Digite o número de série', 'manutencao-rft-search-rft');
		this.get_last_rft = new Button('Obter última RFT', ['btn-success'], 'manutencao-rft-get-last-rft');

		this.internal_rft_id = "";
		this.serialnumber = new TextInput('Número de série', 'text', 'manutencao-rft-serialnumber', true);
		this.operador_id = new Select('Operador', 'manutencao-rft-operador', true);
		this.etapa = new Select('Etapa', 'manutencao-rft-etapa', true);
		this.erro_id = new Select('Erro', 'manutencao-rft-erro', true);
		this.tecnico_id = new Select('Tecnico', 'manutencao-rft-tecnico');
		this.procedimento = new TextArea('Procedimento realizado...', 'manutencao-rft-procedimento');
		this.solucao = new Select('Solução', 'manutencao-rft-solucao');

		this.cancelar = new Button('Cancelar', ['btn-danger'], 'manutencao-rft-cancelar');
		this.salvar_rft = new Button('Salvar', ['btn-secondary'], 'manutencao-rft-salvar-rft');
		this.enviar_rft = new Button('Enviar RFT', ['btn-success'], 'manutencao-rft-enviar');
	}

	generate_data() {
		return {
			"id": this.internal_rft_id,
			"serialNumber": this.serialnumber.getValue(),
			"tecnicoID": this.tecnico_id.getValue(),
			"actions_taken": this.procedimento.getValue(),
			"solucao": this.solucao.getValue()
		}
	}

	render_header(frame_id) {
		this.search_rft.render(frame_id);
		this.get_last_rft.render(frame_id);
	}

	render_body(frame_id) {
		this.serialnumber.render(frame_id);
		this.operador_id.render(frame_id);
		this.etapa.render(frame_id);
		this.erro_id.render(frame_id);
	}

	render_footer(frame_id) {
		this.cancelar.render(frame_id);
		this.salvar_rft.render(frame_id);
		this.enviar_rft.render(frame_id);
	}

}