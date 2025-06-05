import { FormBlock } from './form.js';

export class Block {
    constructor(dom, id) {
        this.dom = dom;
        this.form = new FormBlock(id);
        this.form.values = {};
        this.form.content = `<span>Conteúdo HTML aqui</span>`;
    }

    async render() {
        this.clear();
        //this.form.set(this.form.values);
        this.generateContent();
        this.form.render(this.dom);
        this.form.render_content();
    }

    generateContent() {
        this.form.content = `<span>Novo conteúdo aqui</span>`;
    }

    disabled(state) {
        this.form.disabled(state);
    }

    getAll() {
        return this.form.getAll();
    }

    setAll(values) {
        this.form.values = {...values};
    }

    soft_clear() {
        this.form.clear();
    }

    clear() {
        this.form.clear();
        this.dom.innerHTML = '';
    }
}