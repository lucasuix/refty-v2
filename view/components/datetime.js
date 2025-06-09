export class DatetimeInput {
	constructor(placeholder = 'Selecione data e hora', id = 'datetime-input', state = false) {
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add('form-floating', 'mt-3'); // Bootstrap styling

		this.label = document.createElement('label');
		this.label.setAttribute('for', id);
		this.label.textContent = placeholder;

		this.input = document.createElement('input');
		this.input.id = id;
		this.input.type = 'datetime-local';
		this.input.placeholder = placeholder;
		this.input.classList.add('form-control');

		
		this.wrapper.appendChild(this.input);
        this.wrapper.appendChild(this.label);

		this.disabled(state);
	}

	getValue() {
		return this.input.value;
	}

	setValue(value) {
		this.input.value = value;
	}

	clear() {
		this.input.value = '';
	}

	disabled(state) {
		this.input.disabled = state;
	}

	render(parent = document.body) {
		parent.appendChild(this.wrapper);
	}
}

