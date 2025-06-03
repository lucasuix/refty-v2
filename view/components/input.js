export class TextInput {
	constructor(placeholder = 'Digite aqui', id = 'blank-input', state = false,  type = 'text') {
		this.input = document.createElement('input');
		this.input.id = id;
		this.input.type = type;
		this.input.placeholder = placeholder;
		this.input.classList.add('form-control');  // Classe do Bootstrap

		this.input.classList.add('mt-3');
		this.disabled(state);
	}

	getValue() {
		return this.input.value;
	}

	clear() {
		this.input.value = '';
	}

	disabled(state) {
		this.input.disabled = state;
	}

	setValue(value) {
		this.input.value = value;
	}

	render(parent = document.body) {
		parent.appendChild(this.input);
	}
}