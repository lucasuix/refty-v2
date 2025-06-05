export class Select {
	constructor(placeholder = 'Selecione uma opção', id = 'blank-select', state = false, endpoint = null) {
		this.select = document.createElement('select');
		this.select.classList.add('form-select');  // Classe do Bootstrap
		this.select.id = id;

		// Placeholder (opção desabilitada)
		this.placeholderOption = document.createElement('option');
		this.placeholderOption.textContent = placeholder;
		this.placeholderOption.value = "";
		this.placeholderOption.disabled = true;
		this.placeholderOption.selected = true;
		this.select.appendChild(this.placeholderOption);

		this.select.classList.add('mt-3');
		this.disabled(state);
	}

	async populate(options) {
		this.select.innerHTML = '';
		this.select.appendChild(this.placeholderOption);
		this.select.value = "";
		options.forEach(opt => {
			const option = document.createElement('option');
			option.value = opt.id;
			option.textContent = opt.nome;
			this.select.appendChild(option);
		});
	}

	clear() {
		this.select.value = '';
	}

	disabled(state) {
		this.select.disabled = state;
	}

	getValue() {
		return this.select.value;
	}

	setValue(value) {
		this.select.value = value;
	}

	render(parent = document.body) {
		parent.appendChild(this.select);
	}
}