export class SelectInput {
	constructor(placeholder = 'Digite ou selecione uma opção', id = 'blank-select-input', state = false) {
		this.input = document.createElement('input');
		this.input.type = 'text';
		this.input.placeholder = placeholder;
		this.input.id = id;
		this.input.classList.add('form-control', 'mt-3'); // Estilo tipo select Bootstrap

		this.datalist = document.createElement('datalist');
		this.datalist.id = `${id}-datalist`;

		this.input.setAttribute('list', this.datalist.id);
		this.options = [];
		this.disabled(state);
	}

	async populate(options) {
		this.datalist.innerHTML = '';
		this.options = options;

		options.forEach(opt => {
			const option = document.createElement('option');
			option.value = opt.id;  // mesmo padrão da sua Select
			option.textContent = opt.nome; // opcional, se quiser mostrar no autocomplete
			this.datalist.appendChild(option);
		});
	}

	clear() {
		this.input.value = '';
	}

	disabled(state) {
		this.input.disabled = state;
	}

	getValue() {
		return this.input.value;
	}

	setValue(value) {
		this.input.value = value;
	}

	render(parent = document.body) {
		parent.appendChild(this.input);
		parent.appendChild(this.datalist);
	}
}
