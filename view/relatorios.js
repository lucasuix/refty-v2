import { Block } from "./components/block.js";
import { Button } from "./components/button.js";
import { DatetimeInput } from "./components/datetime.js";
import { Table } from "./components/table.js";
import {send} from './request.js';

class Aggregation extends Block {
    constructor(dom, id = 'relatorio-aggregation') {
        super(dom, id);
        this.form.values = {
            'tempo_real_medio_manutencao': false,
            'tempo_proprio_medio_manutencao': false,
            'rfts_por_etapa': false,
            'perdas_por_componente': false,
            'quantidade_total_rfts': false,
            'erro_mais_frequente': false,
            'solucao_mais_frequente': false
        }
    }

    generateContent() {
        this.form.content = `
            <div class="mt-3 bg-dark rounded-3 border border-secondary p-4 text-light">
            <h5 class="mb-3">Selecionar KPIs para o relatório</h5>
            <div class="row g-3">
                <div class="col-md-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="tempo_real_medio_manutencao" name="tempo_real_medio_manutencao" ${this.form.values.tempo_real_medio_manutencao ? 'checked' : ''}>
                        <label class="form-check-label" for="tempo_real_medio_manutencao">
                            Tempo real médio de manutenção
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="tempo_proprio_medio_manutencao" name="tempo_proprio_medio_manutencao" ${this.form.values.tempo_proprio_medio_manutencao ? 'checked' : ''}>
                        <label class="form-check-label" for="tempo_proprio_medio_manutencao">
                            Tempo próprio médio de manutenção
                        </label>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="rfts_por_etapa" name="rfts_por_etapa" ${this.form.values.rfts_por_etapa ? 'checked' : ''}>
                        <label class="form-check-label" for="rfts_por_etapa">
                            Quantidade de RFTs por etapa
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="perdas_por_componente" name="perdas_por_componente" ${this.form.values.perdas_por_componente ? 'checked' : ''}>
                        <label class="form-check-label" for="perdas_por_componente">
                            Perdas por componente
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="quantidade_total_rfts" name="quantidade_total_rfts" ${this.form.values.quantidade_total_rfts ? 'checked' : ''}>
                        <label class="form-check-label" for="quantidade_total_rfts">
                            Quantidade total de RFTs
                        </label>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="erro_mais_frequente" name="erro_mais_frequente" ${this.form.values.erro_mais_frequente ? 'checked' : ''}>
                        <label class="form-check-label" for="erro_mais_frequente">
                            Erros mais frequentes
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="solucao_mais_frequente" name="solucao_mais_frequente" ${this.form.values.solucao_mais_frequente ? 'checked' : ''}>
                        <label class="form-check-label" for="solucao_mais_frequente">
                            Soluções mais frequentes
                        </label>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

export class Relatorio {

    constructor(relatorio_header, relatorio_body, etapas = [], erros = [], solucoes = []) {

        this.header = document.getElementById(relatorio_header);
        this.body = document.getElementById(relatorio_body);

        this.etapas = {...this.map_dict_from_list(etapas)};
        this.erros = {...this.map_dict_from_list(erros)};
        this.solucoes = {...this.map_dict_from_list(solucoes)};

        this.aggregation_fields = new Aggregation(this.header);
        this.gerar_btn = new Button('Gerar Relatório', ['btn-primary'], 'relatorio-gerar');
        this.inicio = new DatetimeInput('Selecione a data de início', 'relatorio-data-inicio');
        this.final = new DatetimeInput('Selecione a data final', 'relatorio-data-final');

        this.gerar_btn.button.addEventListener('click', () => this.requisitar_relatorio());
        this.callbacks = {
            'tempo_real_medio_manutencao': (data) => this.tempo_real_medio_manutencao(data),
            'tempo_proprio_medio_manutencao': (data) => this.tempo_proprio_medio_manutencao(data),
            'rfts_por_etapa': (data) => this.rfts_por_etapa(data),
            'perdas_por_componente': (data) => this.perdas_por_componente(data),
            'quantidade_total_rfts': (data) => this.quantidade_total_rfts(data),
            'erro_mais_frequente': (data) => this.erro_mais_frequente(data),
            'solucao_mais_frequente': (data) => this.solucao_mais_frequente(data)
        }

        this.render();

        this.requisitar_relatorio_rebound = (data, others) => {

            console.log(data);

            Object.entries(data).forEach(([key,value]) => {
                this.callbacks[key](value);
            });
		}
    }

    //MÉTODOS VISUAIS INICIO
    render() {
        this.aggregation_fields.render();
        this.inicio.render(this.header);
        this.final.render(this.header);
        this.gerar_btn.render(this.header);
    }

    generate_wrapper(value) {
        let wrapper = document.createElement('div');
        wrapper.classList.add('mt-3', 'bg-dark', 'rounded-3', 'border', 'border-secondary', 'p-3');

        if (typeof(value) === 'string') {
            wrapper.innerHTML += value;
        }
        else {
            wrapper.appendChild(value);
        }
        
        return wrapper;
    }

    generateTitle(text) {
        let title = document.createElement('h5');
        title.textContent = text;
        return title;
    }

    clear() {
        this.body.innerHTML = '';
    }
    //METODOS VISUAIS FINAL

    //UTILS INICIO
    map_dict_from_list(list) {
        const dict = {};
        list.forEach(item => {
            dict[item.id] = item.nome;
        });
        return dict;
    }

    map_id_to_name(list, reference) {
        let new_list = list.map(item => ({
            "nome": reference[item._id],
            "quantidade": item.quantidade
        }));
        console.log(new_list);
        return new_list;
    }
    //UTILS FINAL

    //CALLBACKS INÍCIO
    tempo_real_medio_manutencao(list) {
        let data = {...list[0]};
        let text = `<h5>Tempo <b>Real</b> médio de manutenção: `;
        if (Object.keys(data).length == 0) {
            text += `Sem dados disponíveis para o cálculo.</h5>`;
        }
        else {
            text += `${(data.duracao_media).toFixed(2)} minutos | ${(data.duracao_media / 60).toFixed(2)} horas</h5>`;
        }
        let wrapper = this.generate_wrapper(text);
        this.body.appendChild(wrapper);
    }

    tempo_proprio_medio_manutencao(list) {
        let data = {...list[0]};
        let text = `<h5>Tempo <b>Próprio</b> médio de manutenção: `;
        if (Object.keys(data).length == 0) {
            text += `Sem dados disponíveis para o cálculo.</h5>`;
        }
        else {
            text += `${(data.duracao_media).toFixed(2)} minutos | ${(data.duracao_media / 60).toFixed(2)} horas</h5>`;
        }
        let wrapper = this.generate_wrapper(text);
        this.body.appendChild(wrapper);
    }

    rfts_por_etapa(list) {
        let table = new Table(['Etapa', 'Quantidade'], ['table-striped', 'table-bordered'], 'rfts-por-etapa-table');
        let wrapper = this.generate_wrapper(this.generateTitle('Quantidade de RFTs por etapa'));
        wrapper.appendChild(table.table);
        this.body.appendChild(wrapper);
        table.populate(this.map_id_to_name(list, this.etapas));
        if (list.length == 0) wrapper.appendChild(this.generateTitle("Não há nenhuma RFT para essa etapa."));
    }

    perdas_por_componente(list) {
        let table = new Table(['ID', 'Componente', 'Quantidade'], ['table-striped', 'table-bordered'], 'perdas-por-componente-table');
        let filtered_list = list.map(perda => ({
	        componente_id: perda._id.componente_id,
	        nome: perda._id.nome,
	        quantidade: perda.quantidade_total
	    }));
        let wrapper = this.generate_wrapper(this.generateTitle('Quantidade de perdas por componente'));
        wrapper.appendChild(table.table);
        this.body.appendChild(wrapper);
        table.populate(filtered_list);
        if (list.length == 0) wrapper.appendChild(this.generateTitle("Não houve perdas nesse período."));
    }

    quantidade_total_rfts(value) {
        let text = `<h5>Quantidade de RFTs no período: ${value}</h5>`;
        let wrapper = this.generate_wrapper(text);
        this.body.appendChild(wrapper);
    }

    erro_mais_frequente(list) {
        let table = new Table(['Erro', 'Quantidade'], ['table-striped', 'table-bordered'], 'erro-mais-frequente-table');
        let wrapper = this.generate_wrapper(this.generateTitle('Quantidade de Erros por ID (mais frequente p/ menos frequente)'));
        wrapper.appendChild(table.table);
        this.body.appendChild(wrapper);
        table.populate(this.map_id_to_name(list, this.erros));
        if (list.length == 0) wrapper.appendChild(this.generateTitle("Sem dados. Não há RFTs nesse período."));
    }

    solucao_mais_frequente(list) {
        let table = new Table(['Solução', 'Quantidade'], ['table-striped', 'table-bordered'], 'solucao-mais-frequente-table');
        let wrapper = this.generate_wrapper(this.generateTitle('Quantidade de Soluções por ID (mais frequente p/ menos frequente)'));
        wrapper.appendChild(table.table);
        this.body.appendChild(wrapper);
        table.populate(this.map_id_to_name(list, this.solucoes));
        if (list.length == 0) wrapper.appendChild(this.generateTitle("Sem dados. Nenhuma RFT foi solucionada/concluída nesse período."));
    }
    //CALLBACKS FIM

    //METODOS SERVIDOR INICIO
    generate_data() {
        return {
            "kpis": this.aggregation_fields.getAll(),
            "data_inicio": this.inicio.getValue(),
            "data_final": this.final.getValue()
        }
    }

    requisitar_relatorio() {
        this.clear();

        const payload = {
            "rft": this.generate_data(),
            "metadata": {
                "action": "gerar_relatorio"
            }
        }
        
        send(payload, this.requisitar_relatorio_rebound);
    }
    //METODOS SERVIDOR FINAL

}