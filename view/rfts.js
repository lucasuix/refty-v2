import {Button} from './components/button.js';
import {Select} from './components/select.js';
import {TextInput} from './components/input.js';
import {TextArea} from './components/textarea.js';
import {setVisibility} from './utils/visibility.js';
import {send} from './request.js';
import { Erros } from './errors.js';

export class NovaRFT {

	//DECLARAÇÃO INÍCIO
	constructor(body_frame, error_frame, footer_frame) {

		this.body = document.getElementById(body_frame);
		this.erro = document.getElementById(error_frame);
		this.footer = document.getElementById(footer_frame);

		this.serialnumber = new TextInput('Número de série', 'nova-rft-serialnumber');
		this.operador_id = new Select('Operador', 'nova-rft-operador', false, 'operador');
		this.etapa = new Select('Etapa', 'nova-rft-etapa', false, 'etapa');
		this.erro_id = new Select('Erro', 'nova-rft-erro', false, 'erro');

		this.erros = new Erros(this.erro);

		this.cancelar = new Button('Cancelar', ['btn-danger'], 'nova-rft-cancelar');
		this.enviar_rft = new Button('Enviar RFT', ['btn-success'], 'nova-rft-enviar');

		this.etapa.select.addEventListener('change', () => this.change_erro());
		this.cancelar.button.addEventListener('click', () => this.clear());
		this.enviar_rft.button.addEventListener('click', () => this.send_rft());

		this.render_body();
		this.render_footer();

		//Rebounds (what happens after server methods are called, the response from the program)
		//they're passed to the send function from request.js
		this.send_rft_rebound = (data) => {
			this.soft_clear();
		}
	}
	//DECLARAÇÃO FINAL

	//MÉTODOS VISUAIS INÍCIO
	render_body() {
		this.serialnumber.render(this.body);
		this.operador_id.render(this.body);
		this.etapa.render(this.body);
	}

	render_footer() {
		this.cancelar.render(this.footer);
		this.enviar_rft.render(this.footer);
	}

	soft_clear() {
		this.serialnumber.clear();
	}

	clear() {
		this.serialnumber.clear();
		this.operador_id.clear();
		this.etapa.clear();
		this.erros.clear();
	}

	change_erro() {
		this.erros.render(this.etapa.getValue());
	}
	//MÉTODOS VISUAIS FINAL

	//MÉTODOS SERVIDOR INÍCIO
	generate_data() {
		return {
			"serialNumber": this.serialnumber.getValue(),
			"operadorID": this.operador_id.getValue(),
			"stage": this.etapa.getValue(),
			"erro_id": this.erro_id.getValue()
		}
	}

	send_rft() {
		const payload = {
			"rft": this.generate_data(),
			"metadata": {
				"action": "nova_rft"
			}
		}

		send(payload, this.send_rft_rebound);
	}
	//MÉTODOS SERVIDOR FINAL

}

export class ManutencaoRFT {

	//DECLARAÇÃO INÍCIO
	constructor(header_frame, body_frame, error_frame,footer_frame) {

		this.header = document.getElementById(header_frame);
		this.body = document.getElementById(body_frame);
		this.erro = document.getElementById(error_frame);
		this.footer = document.getElementById(footer_frame);

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

		this.erros = new Erros(this.erro);

		this.cancelar = new Button('Cancelar', ['btn-danger'], 'manutencao-rft-cancelar');
		this.salvar_rft = new Button('Salvar', ['btn-secondary'], 'manutencao-rft-salvar-rft');
		this.enviar_rft = new Button('Enviar RFT', ['btn-success'], 'manutencao-rft-enviar');

		this.get_last_rft.button.addEventListener('click', () => this.start_rft());
		this.cancelar.button.addEventListener('click', () => this.clear());
		this.enviar_rft.button.addEventListener('click', () => this.save_rft());
		this.enviar_rft.button.addEventListener('click', () => this.finish_rft());

		this.start_rft_rebound = (data) => {
			this.internal_rft_id = data.id;
			this.serialnumber.setValue(data.serialNumber);
			this.operador_id.setValue(data.operadorID);
			this.etapa.setValue(data.stage);
			this.erro_id.setValue(data.erro_id);

			this.tecnico_id.setValue(data.tecnicoID);
			this.procedimento.setValue(data.actions_taken);
			this.solucao.setValue(data.solucao);
		}

		this.save_rft_rebound = (data) => {
			console.log("Save RFT rebound!");
		}

		this.finish_rft_rebound = (data) => {
			console.log("Finish RFT rebound");
			this.clear();
			this.hide();
		}

		this.render_header();
		this.render_body();
		this.render_footer();

		this.hide();
	}
	//DECLARAÇÃO FIM

	//MÉTODOS VISUAIS INÍCIO
	render_header() {
		this.search_rft.render(this.header);
		this.get_last_rft.render(this.header);
	}

	render_body() {
		this.serialnumber.render(this.body);
		this.operador_id.render(this.body);
		this.etapa.render(this.body);
		this.erro_id.render(this.body);
		this.tecnico_id.render(this.body);
		this.procedimento.render(this.body);
		this.solucao.render(this.body);
	}

	render_footer() {
		this.cancelar.render(this.footer);
		this.salvar_rft.render(this.footer);
		this.enviar_rft.render(this.footer);
	}

	clear() {
		this.tecnico_id.clear();
		this.procedimento.clear();
		this.solucao.clear();
	}

	hide() {
		setVisibility(this.body, false);
		setVisibility(this.footer, false);
	}

	show() {
		setVisibility(this.body, true);
		setVisibility(this.footer, true);
	}
	//MÉTODOS VISUAIS FIM

	//MÉTODOS EM RELAÇÃO AO SERVIDOR INÍCIO
	generate_data() {
		return {
			"id": this.internal_rft_id,
			"serialNumber": this.serialnumber.getValue(),
			"tecnicoID": this.tecnico_id.getValue(),
			"actions_taken": this.procedimento.getValue(),
			"solucao": this.solucao.getValue()
		}
	}

	start_rft() {
		const payload = {
			"rft": {"serialNumber": this.serialnumber.getValue()},
			"metadata": {
				"action": "iniciar_manutencao"
			}
		}

		send(payload, this.start_rft_rebound);
	}

	save_rft() {
		const payload = {
			"rft": this.generate_data(),
			"metadata": {
				"action": "salvar_manutencao"
			}
		}

		send(payload, this.save_rft_rebound);
	}

	finish_rft() {
		const payload = {
			"rft": this.generate_data(),
			"metadata": {
				"action": "concluir_manutencao"
			}
		}

		send(payload, this.finish_rft_rebound);
	}
	//MÉTODOS EM RELAÇÃO AO SERVIDOR FIM
}