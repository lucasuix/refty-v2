export class TextArea {
	constructor(placeholder = 'Digite aqui', id = 'blank-textarea', state = false, rows = 4) {
		this.textarea = document.createElement('textarea');
		this.textarea.id = id;
		this.textarea.placeholder = placeholder;
		this.textarea.rows = rows;
		this.textarea.classList.add('form-control');  // Bootstrap

		this.textarea.classList.add('mt-3');
		this.disabled(state);
	}

	getValue() {
		return this.textarea.value;
	}

	clear() {
		this.textarea.value = '';
	}

	disabled(state) {
		this.textarea.disabled = state;
	}

	setValue(value) {
		this.textarea.value = value;
	}

	render(parent = document.body) {
		parent.appendChild(this.textarea);
	}
}