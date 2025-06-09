import { Block } from "./components/block.js";
import { Button } from "./components/button.js";
import { DatetimeInput } from "./components/datetime.js";

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

    constructor(relatorio_header, relatorio_body) {

        this.header = document.getElementById(relatorio_header);
        this.body = document.getElementById(relatorio_body);

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

        this.requisitar_relatorio_rebound = (data) => {
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

    tempo_real_medio_manutencao(data) {
        data.forEach(value => {
            let wrapper = document.createElement('div');
            wrapper.classList.add('bg-dark', 'd-flex', 'justify-contente-between');
        });
    }
    //METODOS VISUAIS FINAL

    //METODOS SERVIDOR INICIO
    generate_data() {
        return {
            "kpis": this.aggregation_fields.getAll(),
            "data_inicio": this.inicio.getValue(),
            "data_final": this.final.getValue()
        }
    }

    requisitar_relatorio() {
        const payload = {
            "rft": this.generate_data(),
            "metadata": {
                "action": "gerar_relatorio"
            }
        }
        
        console.log(payload);
    }
    //METODOS SERVIDOR FINAL

}