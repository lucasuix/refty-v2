import { Block } from './components/block.js';
import { Select } from './components/select.js';

class PreTestes extends Block {
    constructor(error_dom, id) {
        super(error_dom, id);
        this.etapa = 1;
        this.form.values = {
            "temporizacao": "",
            "bateria_cr032": "",
            "calibracao": ""
        }
    }

    generateContent() {
        this.form.content = `
            <div class="form-floating mb-3 mt-3">
                <input type="text" class="form-control" name="temporizacao" value="${this.form.values.temporizacao}">
                <label for="floatingInput">1.1 Temporização</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="bateria_cr032" value="${this.form.values.bateria_cr032}">
                <label for="floatingInput">1.2 Bateria CR2032</label>
            </div>
            <div class="form-floating">
                <input type="text" class="form-control" name="calibracao" value="${this.form.values.calibracao}">
                <label for="floatingInput">1.4 Calibração</label>
            </div>
        `;
    } 
}

class Potencia extends Block {
    constructor(error_dom, id) {
        super(error_dom, id);
        this.etapa = 2;
        this.form.values = {
            "curto_bateria": false,
			"dcdc_isolado": false,
			"subtensao_bateria": false,
			"curto_dcdc": false,
			"bateria_isolado": false,
			"retorno_subtensao": false,
			"dcdc_load_stepup": false,
			"retorno_sensor1": false,
			"retorno_sensor2": false,
			"teste_da_bateria": false,
			"carga_bateria": false
        }
    }

    generateContent() {
        this.form.content = `
            <div class="mt-3 bg-dark rounded-3 border border-secondary p-3">
                <div class="form-floating">
                    <div class="d-flex">
                        <div class="mx-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="curto_bateria" ${this.form.values.curto_bateria ? 'checked' : ''}>
                                <label class="form-check-label" for="curto_bateria">Curto Bateria</label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="dcdc_isolado" ${this.form.values.dcdc_isolado ? 'checked' : ''}>
                                <label class="form-check-label" for="dcdc_isolado">DC-DC Isolado</label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="subtensao_bateria" ${this.form.values.subtensao_bateria ? 'checked' : ''}>
                                <label class="form-check-label" for="subtensao_bateria">Subtensão Bateria</label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="curto_dcdc" ${this.form.values.curto_dcdc ? 'checked' : ''}>
                                <label class="form-check-label" for="curto_dcdc">Curto DC-DC</label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="bateria_isolado" ${this.form.values.bateria_isolado ? 'checked' : ''}>
                                <label class="form-check-label" for="bateria_isolado">Bateria Isolado</label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="retorno_subtensao" ${this.form.values.retorno_subtensao ? 'checked' : ''}>
                                <label class="form-check-label" for="retorno_subtensao">Retorno Subtensão</label>
                            </div>
                        </div>

                        <div class="mx-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="dcdc_load_stepup" ${this.form.values.dcdc_load_stepup ? 'checked' : ''}>
                                <label class="form-check-label" for="dcdc_load_stopup">DC-DC, Load, Step-Up</label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="retorno_sensor1" ${this.form.values.retorno_sensor1 ? 'checked' : ''}>
                                <label class="form-check-label" for="retorno_sensor1">Retorno Sensor 1</label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="retorno_sensor2" ${this.form.values.retorno_sensor2 ? 'checked' : ''}>
                                <label class="form-check-label" for="retorno_sensor2">Retorno Sensor 2</label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="teste_da_bateria" ${this.form.values.teste_da_bateria ? 'checked' : ''}>
                                <label class="form-check-label" for="teste_da_bateria">Teste da Bateria</label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="carga_bateria" ${this.form.values.carga_bateria ? 'checked' : ''}>
                                <label class="form-check-label" for="carga_bateria">Carga da Bateria</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        `;
    }
}

class Comunicacao extends Block {
    constructor(error_dom, id) {
        super(error_dom, id);
        this.pre_fix = id;
        this.etapa = 3;
        this.form.values = {
            "comunicacao": ""
        }
    }

    generateContent() {
        this.form.content = `
            <div class="form-floating">
                <textarea class="form-control" id="${this.pre_fix}-field" name="comunicacao" style="height: 100px">${this.form.values.comunicacao}</textarea>
                <label for="${this.pre_fix}-field">Decrição do Problema</label>
            </div>
        `;
    }
}

class Burnin extends Block {
    constructor(error_dom, id) {
        super(error_dom, id);
        this.pre_fix = id;
        this.etapa = 4;
        this.form.values = {
            "burnin": ""
        }
    }

    generateContent() {
        this.form.content = `
            <div class="form-floating">
                <textarea class="form-control" id="${this.pre_fix}-field" name="burnin" style="height: 100px">${this.form.values.burnin}</textarea>
                <label for="${this.pre_fix}-field">Decrição do Problema</label>
            </div>
        `;
    }
}

export class Erros {
    constructor(error_dom, name) {
        this.dom = error_dom;

        this.pretestes = new PreTestes(this.dom, `${name}-pre-testes`);
        this.potencia = new Potencia(this.dom, `${name}-potencia`);
        this.comunicacao = new Comunicacao(this.dom, `${name}-comunicacao`);
        this.burnin = new Burnin(this.dom, `${name}-burnin`);

        this.etapa_id = 1;

        this.erro_id = new Select("Erro ID", `${name}-erro-id`);

        this.etapas = {
            1: this.pretestes,
            2: this.potencia,
            3: this.comunicacao,
            4: this.burnin
        };
    }

    async populate_erros_id() {
        this.erros_id = {
            1: await eel.getErros(1)(),
            2: await eel.getErros(2)(),
            3: await eel.getErros(3)(),
            4: await eel.getErros(4)()
        };
    }

    render(etapa_id) {
        this.etapa_id = etapa_id;
        this.etapas[this.etapa_id].render();

        this.erro_id.populate(this.erros_id[etapa_id]);
        this.erro_id.render(this.dom);
    }

    setAll(values, etapa_id) {
        this.etapa_id = etapa_id;
        this.etapas[this.etapa_id].setAll(values);
    }

    disabled(state, etapa_id) {
        this.etapa_id = etapa_id;
        this.etapas[this.etapa_id].disabled(state);
    }

    getAll() {
        return {...this.etapas[this.etapa_id].getAll()};
    }

    soft_clear() {
        this.pretestes.soft_clear();
        this.potencia.soft_clear();
        this.comunicacao.soft_clear();
        this.burnin.soft_clear();
        this.erro_id.setValue("");
    }

    clear() {
        this.soft_clear();
        this.dom.innerHTML = '';
    }
}