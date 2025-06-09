import {Table} from './components/table.js';
import {SelectInput} from './components/selectinput.js';
import {TextInput} from './components/input.js';
import {Button} from './components/button.js';

/*
------------------------------------------- AVISO ---------------------------------------

>>> A ESTRUTURA DESSA CLASSE NO QUE DIZ RESPEITO AO ADICIONAR PERDA E GET VALUE É TEMPORÁRIO
>>> O IDEAL É QUE A LISTA DE COMPONENTES SEJA FIXA, COM TODOS OS COMPONENTES DA TCU
>>> O USUÁRIO ENTÃO, NEM MESMO O SERVIDOR IRÃO ADICIONAR NOVOS COMPONENTES
>>> ISSO VAI DEIXAR A CLASSE MAIS BEM ESTRUTURADA SEM A NECESSIDADE DE COLOCAR "NEW" COMO ID
>>> COMO FLAG QUE O SERVIDOR TEM QUE ADICIONAR ELES AO BANCO DE DADOS
*/

export class Perdas {
	constructor() {
		this.container = document.createElement('div');
		this.container.classList.add('mt-3', 'bg-dark', 'rounded-3', 'border', 'border-secondary', 'p-3');

		this.title = document.createElement('h5');
		this.title.textContent = "Perdas";
		
		this.perdas_table = new Table(['ID', 'Componente', 'Quantidade', 'Action'], ['table-striped', 'table-bordered'], 'manutencao-rft-perdas-table');
		this.componente = new SelectInput('Selecione ou digite uma nova perda...', 'manutencao-rft-perda-componente');
		this.quantidade = new TextInput('Quantidade', 'manutencao-rft-perda-quantidade');
		this.quantidade.input.type = 'number';
		this.adicionar = new Button('Adicionar Perda', 'manutencao-rft-adicionar-perda');

		this.perdas_footer = document.createElement('div');
		this.perdas_footer.classList.add('d-flex', 'gap-2');

		this.contador = 0;
		//Usado como ID para as rows no botão remover
		//Incrementa a cada adicionar
		//Nenhuma ROW repete o valor enquanto =>
		//O usuário chamar uma nova RFT para manutenção
		//Ou concluir, o que nesse caso os métodos
		//clear para a tabela serão chamados evitando colisões

		this.adicionar.button.addEventListener('click', () => this.adicionar_perda());
	}

	getValue() {
	    return this.perdas_table.getValue().map(perda => ({
	        componente_id: perda.ID,
	        nome: perda.Componente,
	        quantidade: perda.Quantidade
	    }));
	}


	adicionar_perda() {
		let componente_obj = this.componente.options.find(c => c.id == this.componente.getValue());

		if (!componente_obj) { //Se não existir o componente recebe a ID new, que quando chegar no servidor significa que é para criar um novo componente
			componente_obj = {id: "NEW", nome: this.componente.getValue()};
		}

		let quantidade = parseInt(this.quantidade.getValue());

		if (isNaN(quantidade) || quantidade <= 0) {
			quantidade = 1;
		}

		const remover_botao_id = `btn-${this.contador++}-remover`;
		let row = {
			"ID": componente_obj.id,
			"Componente": componente_obj.nome,
			"Quantidade": quantidade,
			"Ação": `<button class="btn btn-sm btn-danger" id="${remover_botao_id}">Remover</button>`
		};
		this.perdas_table.add_row(row);
		this.soft_clear();

		const btnremover = document.getElementById(remover_botao_id);
		if (btnremover) {
			btnremover.addEventListener('click', (event) =>{
				const tr = event.target.closest('tr');
				if (tr) tr.remove();
			});
		}
	}

	render(parent = document.body) {
		parent.appendChild(this.container);
		this.container.appendChild(this.title);
		this.perdas_table.render(this.container);

		this.container.appendChild(this.perdas_footer);
		this.componente.render(this.perdas_footer);
		this.quantidade.render(this.perdas_footer);
		this.adicionar.render(this.perdas_footer);
	}

	disabled(state) {
		this.componente.disabled(state);
		this.quantidade.disabled(state);
		this.adicionar.disabled(state);
	}

	soft_clear() {
		this.componente.setValue('');
		this.componente.clear();
		this.quantidade.setValue('');
		this.quantidade.clear();
	}

	clear() {
		this.perdas_table.clear_rows();
		this.componente.setValue('');
		this.componente.clear();
		this.quantidade.setValue('');
		this.quantidade.clear();
		this.contador = 0;
	}

	popular_perdas(perdas_list, concluida) {
		perdas_list.forEach(perda => {
			const remover_botao_id = `btn-${this.contador++}-remover`;
			let row = {
				"ID": perda.componente_id,
				"Componente": perda.nome,
				"Quantidade": perda.quantidade,
				"Ação": `<button class="btn btn-sm btn-danger" id="${remover_botao_id}" ${concluida ? 'disabled' : null}>Remover</button>`
			};
			this.perdas_table.add_row(row);
			this.soft_clear();

			const btnremover = document.getElementById(remover_botao_id);
			if (btnremover) {
				btnremover.addEventListener('click', (event) =>{
					const tr = event.target.closest('tr');
					if (tr) tr.remove();
				});
			}
		});
	}

	popular_componentes(componentes_list) {
		this.componente.populate(componentes_list);
	}
}