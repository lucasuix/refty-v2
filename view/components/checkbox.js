export class CheckboxInput {
	constructor(labelText = 'Check me', id = 'blank-checkbox', state = false) {
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add('form-check', 'mt-3'); // Bootstrap spacing and checkbox class

		this.input = document.createElement('input');
		this.input.type = 'checkbox';
		this.input.id = id;
		this.input.classList.add('form-check-input');
		this.input.checked = state;

		this.label = document.createElement('label');
		this.label.classList.add('form-check-label');
		this.label.setAttribute('for', id);
		this.label.textContent = labelText;

		this.wrapper.appendChild(this.input);
		this.wrapper.appendChild(this.label);
	}

	getValue() {
		return this.input.checked;
	}

	setValue(checked) {
		this.input.checked = checked;
	}

	disabled(state) {
		this.input.disabled = state;
	}

	clear() {
		this.input.checked = false;
	}

	render(parent = document.body) {
		parent.appendChild(this.wrapper);
	}
}