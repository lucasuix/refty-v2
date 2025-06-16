import { Button } from "./components/button.js";
import { TextInput } from "./components/input.js";
import { Accordion } from "./components/accordion.js";
import { Select } from "./components/select.js";
import { send } from "./request.js";

class RftCard {

    constructor(rft_data) {
        this.id = rft_data['_id'];
        this.rft_data = {...rft_data};
        this.metadata = this.rft_data['metadata'];
        this.defeitos = this.rft_data['defeitos'];
        this.perdas = this.rft_data['perdas'];
        delete this.rft_data['metadata'];
        delete this.rft_data['defeitos'];
        delete this.rft_data['perdas'];

        this.dom = document.createElement('div');
        this.dom.classList.add('accordion', 'my-3');
        this.dom.id = rft_data['_id'];
    }

    render(parent = document.body) {
        parent.appendChild(this.dom);
        this.dom.innerHTML = this.generate_content();
    }

    generate_common_attr(data) {
        let result_str = "";
        Object.entries(data).forEach(([key, value]) => {
            result_str += `<li class="list-group-item"><strong>${key.toUpperCase()}: </strong>${value}</li>`;
        });
        return result_str;
    }

    generate_content() {
        return `
                <div class="accordion-item">
                <h2 class="accordion-header" id="headingrft-${this.id}">
                    <button class="accordion-button bg-primary text-white" type="button" data-bs-toggle="collapse" data-bs-target="#collapserft-${this.id}" aria-expanded="true" aria-controls="collapserft-${this.id}">
                    <strong>RFT - SN: ${this.rft_data.serialnumber}</strong>
                    </button>
                </h2>
                <div id="collapserft-${this.id}" class="accordion-collapse collapse" aria-labelledby="headingrft-${this.id}" data-bs-parent="#accordionrft-${this.id}">
                    <div class="accordion-body">

                    <h5 class="mb-3">Detalhes da RFT</h5>
                    <ul class="list-group list-group-flush mb-3">
                        ${this.generate_common_attr(this.rft_data)}
                    </ul>

                    <div class="accordion mt-3" id="metadataAccordion-${this.id}">
                        <div class="accordion-item">
                        <h2 class="accordion-header" id="headingmeta-${this.id}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsemeta-${this.id}" aria-expanded="false" aria-controls="collapsemeta-${this.id}">
                            Metadata
                            </button>
                        </h2>
                        <div id="collapsemeta-${this.id}" class="accordion-collapse collapse" aria-labelledby="headingMeta-${this.id}" data-bs-parent="#metadataAccordion-${this.id}">
                            <div class="accordion-body">
                            <ul class="list-group list-group-flush">
                                ${this.generate_common_attr(this.metadata)}
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="mt-3">
                        <button class="btn btn-outline-primary btn-sm">Ver Mais</button>
                        <button class="btn btn-outline-danger btn-sm">Excluir</button>
                    </div>

                    </div>
                </div>
                </div>
        `;
    }
}

export class ListarRfts {
    constructor(header, body) {

        this.header = document.getElementById(header);
        this.body = document.getElementById(body);

        this.rfts = [];

        this.acc = new Accordion('listar-rfts-filtros');
        this.filtros = document.createElement('div');

        this.wrapper_head = document.createElement('div');
        this.wrapper_head.classList.add('mx-3');
        this.serialnumber = new TextInput('Número de série', 'listar-rfts-serialnumber');

        this.wrapper_body = document.createElement('div');
        this.wrapper_body.classList.add('d-flex', 'mx-3');
        this.etapa_id = new Select('Etapa', 'listar-rfts-etapa', false);
        this.erro_id = new Select('Erro ID', 'listar-rfts-erro', false);
        this.operador_id = new Select('Operador', 'listar-rfts-operador', false);
        this.tecnico_id = new Select('Técnico', 'listar-rfts-tecnico', false);
        this.solucao_id = new Select('Solução ID', 'listar-rfts-solucao', false);

        this.wrapper_footer = document.createElement('div');
        this.wrapper_footer.classList.add('justify-content-end', 'd-flex', 'mx-3', 'mb-3');
        this.buscar = new Button('Buscar', ['btn-success'], 'listar-rfts-btn-buscar');

        this.buscar.button.addEventListener('click', () => this.buscar_rfts());

        this.buscar_rfts_rebound = (data, others) => {
            this.clear();
            data.forEach(rft => {
                this.rfts.push(new RftCard({...rft}));
            });
            this.render_body();
        }

        this.render();
    }

    buscar_rfts() {
        const payload = {
            "rft": this.generate_data(),
            "metadata": {
                "action": "listar_rfts"
            }
        };

        send(payload, this.buscar_rfts_rebound);
    }

    render_header() {
        this.acc.render(this.header);
        this.serialnumber.render(this.wrapper_head);

        this.etapa_id.render(this.wrapper_body);
        this.erro_id.render(this.wrapper_body);
        this.operador_id.render(this.wrapper_body);
        this.tecnico_id.render(this.wrapper_body);
        this.solucao_id.render(this.wrapper_body);
        
        this.buscar.render(this.wrapper_footer);

        this.filtros.appendChild(this.wrapper_head);
        this.filtros.appendChild(this.wrapper_body);
        this.filtros.appendChild(this.wrapper_footer);

        this.acc.addItem('listar-rfts-filtros', 'Filtros de Pesquisa', this.filtros); 
    }

    render_body() {
        this.rfts.forEach(rft => {
            rft.render(this.body);
        });
    }

    render() {
        this.render_header();
        this.render_body();
    }

    clear() {
        this.body.innerHTML = '';
        this.rfts = [];
    }

    generate_data() {
            let data = {
                "serialnumber": this.serialnumber.getValue(),
                "operador_id": Number(this.operador_id.getValue()),
                "etapa_id": Number(this.etapa_id.getValue()),
                "erro_id": Number(this.erro_id.getValue()),
                "solucao_id": Number(this.solucao_id.getValue()),
                "tecnico_id": Number(this.tecnico_id.getValue())
            }

            Object.entries(data).forEach(([key,value]) => {
                if (value == 0 || value == "") delete data[key];
            });

            return data;
    }
}