export class FormBlock {
	constructor(id = 'blank-id', classes = [], state = false) {
		this.form = document.createElement('form');
        this.form.id = id;
        this.form.innerHTML = '';
		this.add_classes(classes);
		this.disabled(state);

        this.values = {};
        this.content = `<span>Conteúdo do Formulário aqui!</span>`;
	}

	add_classes(class_list) {
		this.form.classList.add('mt-3', ...class_list);
	}

	disabled(state) {
		Array.from(this.form.elements).forEach(el => el.disabled = state);
	}

	addChild(childElement) {
		this.form.appendChild(childElement);
	}

    set(values) {
        this.values = {...values};
    }

    getAll() {
        const formData = new FormData(this.form);
        return Object.fromEntries(formData.entries());
    }

	clear() {
		this.form.reset();
	}

    render_content() {
        this.form.innerHTML = this.content;
    }

	render(parent = document.body) {
		parent.appendChild(this.form);
	}
}
