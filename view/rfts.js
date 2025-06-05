import {Button} from './components/button.js';
import {Select} from './components/select.js';
import {TextInput} from './components/input.js';
import {TextArea} from './components/textarea.js';
import {setVisibility} from './utils/visibility.js';
import { gerar_descricao } from './utils/gerar_descricao.js';
import {send} from './request.js';
import { Erros } from './erros.js';

export class NovaRFT {

	//DECLARAÇÃO INÍCIO
	constructor(body_frame, error_frame, footer_frame) {

		this.body = document.getElementById(body_frame);
		this.erro = document.getElementById(error_frame);
		this.footer = document.getElementById(footer_frame);

		this.serialnumber = new TextInput('Número de série', 'nova-rft-serialnumber');
		this.operador_id = new Select('Operador', 'nova-rft-operador', false);
		this.etapa = new Select('Etapa', 'nova-rft-etapa', false);

		this.erros = new Erros(this.erro, 'nova-rft');

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
		this.erros.soft_clear();
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
			"serialnumber": this.serialnumber.getValue(),
			"operador_id": this.operador_id.getValue(),
			"etapa_id": this.etapa.getValue(),
			"erro_id": this.erros.erro_id.getValue(),
			"defeitos": {...this.erros.getAll()},
			'metadata': { 
                'concluida': false,
                'descricao_defeito': gerar_descricao(	this.erros.getAll(),
														this.etapa.getValue(),
														this.erros.erro_id.getValue(),
														this.erros.erros_id[this.etapa.getValue()]),
            }
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
	constructor(header_frame, body_frame, error_frame, manutencao_frame, footer_frame) {

		this.header = document.getElementById(header_frame);
		this.body = document.getElementById(body_frame);
		this.erro = document.getElementById(error_frame);
		this.manutencao = document.getElementById(manutencao_frame);
		this.footer = document.getElementById(footer_frame);

		this.search_rft = new TextInput('Digite o número de série', 'manutencao-rft-search-rft');
		this.get_last_rft = new Button('Obter última RFT', ['btn-success'], 'manutencao-rft-get-last-rft');

		this.internal_rft_id = "";
		this.serialnumber = new TextInput('Número de série', 'manutencao-rft-serialnumber', true);
		this.operador_id = new Select('Operador', 'manutencao-rft-operador', true);
		this.etapa = new Select('Etapa', 'manutencao-rft-etapa', true);
		this.tecnico_id = new Select('Tecnico', 'manutencao-rft-tecnico');
		this.procedimento = new TextArea('Procedimento realizado...', 'manutencao-rft-procedimento');
		this.solucao = new Select('Solução', 'manutencao-rft-solucao');
		this.perdas = new TextArea('Perdas', 'manutencao-rft-perdas');

		this.erros = new Erros(this.erro, 'manutencao-rft');

		this.cancelar = new Button('Cancelar', ['btn-danger'], 'manutencao-rft-cancelar');
		this.salvar_rft = new Button('Salvar', ['btn-secondary'], 'manutencao-rft-salvar-rft');
		this.retomar_rft = new Button('Retomar', ['btn-warning', 'manutencao-rft-retomar']);
		this.pausar_rft = new Button('Pausar', ['btn-warning'], 'manutencao-rft-pausar');
		this.enviar_rft = new Button('Enviar RFT', ['btn-success'], 'manutencao-rft-enviar');

		this.get_last_rft.button.addEventListener('click', () => this.start_rft());
		this.cancelar.button.addEventListener('click', () => this.clear());
		this.salvar_rft.button.addEventListener('click', () => this.save_rft());
		this.pausar_rft.button.addEventListener('click', () => this.pause_rft());
		this.retomar_rft.button.addEventListener('click', () => this.unpause_rft());
		this.enviar_rft.button.addEventListener('click', () => this.finish_rft());

		this.start_rft_rebound = (rft) => {
			this.search_rft.setValue("");

			this.internal_rft_id = rft.id;
			this.serialnumber.setValue(rft.serialnumber);
			this.operador_id.setValue(rft.operador_id);
			this.etapa.setValue(rft.etapa_id);
			this.erros.setAll(rft.defeitos, rft.etapa_id);
			this.erros.render(rft.etapa_id);
			this.erros.disabled(true, rft.etapa_id);
			this.erros.erro_id.setValue(rft.erro_id);
			this.erros.erro_id.disabled(true);

			this.tecnico_id.setValue(rft.tecnico_id == undefined ? "" : rft.tecnico_id);
			this.procedimento.setValue(rft.procedimento == undefined ? "" : rft.procedimento);
			this.solucao.setValue(rft.solucao == undefined ? "" : rft.solucao);
			this.perdas.setValue(rft.perdas == undefined ? "": rft.perdas);

			this.tecnico_id.disabled(rft.metadata.concluida);
			this.procedimento.disabled(rft.metadata.concluida);
			this.solucao.disabled(rft.metadata.concluida);
			this.perdas.disabled(rft.metadata.concluida);

			this.salvar_rft.disabled(rft.metadata.concluida);
			this.pausar_rft.disabled(rft.metadata.congelada || rft.metadata.concluida );
			this.enviar_rft.disabled(rft.metadata.concluida || rft.metadata.congelada);
			this.retomar_rft.disabled(!(rft.metadata.congelada) || rft.metadata.concluida);

			this.show();
		}

		this.pause_rft_rebound = (rft) => {
			this.pausar_rft.disabled(rft.metadata.congelada);
			this.enviar_rft.disabled(rft.metadata.congelada);
			this.retomar_rft.disabled(!(rft.metadata.congelada));
		}

		this.save_rft_rebound = (rft) => {
			console.log("Save RFT rebound!");
		}

		this.finish_rft_rebound = (rft) => {
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
	}

	render_footer() {
		this.tecnico_id.render(this.manutencao);
		this.procedimento.render(this.manutencao);
		this.solucao.render(this.manutencao);
		this.perdas.render(this.manutencao);
		this.cancelar.render(this.footer);
		this.salvar_rft.render(this.footer);
		this.pausar_rft.render(this.footer);
		this.retomar_rft.render(this.footer);
		this.enviar_rft.render(this.footer);
	}

	clear() {
		this.tecnico_id.clear();
		this.procedimento.clear();
		this.solucao.clear();
		this.erros.clear();
		this.hide();
	}

	hide() {
		setVisibility(this.manutencao, false);
		setVisibility(this.body, false);
		setVisibility(this.footer, false);
	}

	show() {
		setVisibility(this.manutencao, true);
		setVisibility(this.body, true);
		setVisibility(this.footer, true);
	}
	//MÉTODOS VISUAIS FIM

	//MÉTODOS EM RELAÇÃO AO SERVIDOR INÍCIO
	generate_data() {
		return {
			"id": this.internal_rft_id,
			"serialnumber": this.serialnumber.getValue(),
			"tecnico_id": this.tecnico_id.getValue(),
			"procedimento": this.procedimento.getValue() == "" ? this.solucao.select.options[this.solucao.select.selectedIndex].text : this.procedimento.getValue(),
			"solucao_id": this.solucao.getValue(),
			"perdas": this.perdas.getValue() == "" ? "Sem perdas" : this.perdas.getValue()
		}
	}

	unpause_rft() {
		const payload = {
			"rft": { "id": this.internal_rft_id },
			"metadata": {
				"action": "retomar_manutencao"
			}
		}

		send(payload, this.pause_rft_rebound);
	}

	pause_rft() {
		const payload = {
			"rft": {"id": this.internal_rft_id },
			"metadata": {
				"action": "pausar_manutencao"
			}
		}

		send(payload, this.pause_rft_rebound);
	}

	start_rft() {
		const payload = {
			"rft": {"serialnumber": this.search_rft.getValue()},
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