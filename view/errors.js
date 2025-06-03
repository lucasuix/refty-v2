import {Select} from './components/select.js';
import {TextInput} from './components/input.js';
import {TextArea} from './components/textarea.js';

class Error {
    constructor(error_dom) {
        this.dom = error_dom;
        this.etapa = 0;
        this.erro_id = new Select('Erro', 'nova-rft-erro', false, 'erro');
        this.field_list = []
    }

    async get_erros() {
        this.error_id_list = await eel.getData('erro', {"etapa_id": this.etapa});
    }

    async render() {
        this.clear();
        this.field_list.forEach(e => {
            this.dom.appendChild(e);
        });

        await this.get_erros();
        this.erro_id.render(this.dom);
        this.erro_id.populate(this.error_id_list);
    }

    clear() {
        this.dom.innerHTML = '';
    }
}

class PreTestes extends Error {
    constructor(error_dom) {
        super(error_dom);

        this.etapa = 1;

        this.temporizacao = new TextInput('Temporização', 'nova-rft-erro-temporizacao');
        this.bateria_cr032 = new TextInput('Bateria CR032', 'nova-rft-erro-bateria-cr032');
        this.calibracao = new TextInput('Calibração', 'nova-rft-erro-calibracao');

        this.field_list = [
            this.temporizacao.input,
            this.bateria_cr032.input,
            this.calibracao.input
        ]
    }

    set(values) {
        this.temporizacao.setValue(values['temporizacao']);
        this.bateria_cr032.setValue(values['bateria_cr032']);
        this.calibracao.setValue(values['calibracao']);
    }

    clean() {
        this.temporizacao.clear();
        this.bateria_cr032.clear();
        this.calibracao.clear();
    }
}

class Potencia extends Error {
    constructor(error_dom) {
        super(error_dom);

    }
}

class Comunicacao extends Error {
    constructor(error_dom) {
        super(error_dom);

        this.etapa = 3;

        this.comunicacao = new TextArea('Descrição do erro', 'nova-rft-erro-comunicacao');

        this.field_list = [
            this.comunicacao.textarea
        ]
    }

    set(values) {
        this.comunicacao.setValue(values['comunicacao']);
    }

    clean() {
        this.comunicacao.clear();
    }
}

class Burnin extends Error {
    constructor(error_dom) {
        super(error_dom);

        this.etapa = 4;

        this.burnin = new TextArea('Descrição do erro', 'nova-rft-erro-burnin');

        this.field_list = [
            this.burnin.textarea
        ]
    }

    set(values) {
        this.burnin.setValue(values['burnin']);
    }

    clean() {
        this.burnin.clear();
    }
}

export class Erros {
    constructor(error_dom) {
        this.dom = error_dom;

        this.pretestes = new PreTestes(error_dom);
        this.potencia = new Potencia(error_dom);
        this.comunicacao = new Comunicacao(error_dom);
        this.burnin = new Burnin(error_dom);

        this.etapas = {
            1: this.pretestes,
            2: this.potencia,
            3: this.comunicacao,
            4: this.burnin
        }
    }

    render(etapa) {
        this.etapas[etapa].render(this.dom);
    }

    clear() {
        this.dom.innerHTML = '';
    }
}