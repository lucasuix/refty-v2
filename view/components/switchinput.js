export class SwitchInput {
	constructor(label = 'Prever solução com IA', id = 'ai-assist', state = false) {
		// Container externo com classes do Bootstrap
		this.wrapper = document.createElement('div');
		this.wrapper.classList.add('d-flex', 'mt-1');

		// Div interna da form-switch
		this.switchDiv = document.createElement('div');
		this.switchDiv.classList.add('form-check', 'form-switch');

		// Input do tipo checkbox
		this.input = document.createElement('input');
		this.input.type = 'checkbox';
		this.input.classList.add('form-check-input');
		this.input.id = id;
		this.input.role = 'switch';
		this.input.checked = state;

		// Label do switch
		this.label = document.createElement('label');
		this.label.classList.add('form-check-label');
		this.label.setAttribute('for', id);
		this.label.textContent = label;

		// Montagem da estrutura
		this.switchDiv.appendChild(this.input);
		this.switchDiv.appendChild(this.label);
		this.wrapper.appendChild(this.switchDiv);
	}

	getValue() {
		return this.input.checked;
	}

	setValue(state) {
		this.input.checked = state;
	}

	disabled(state) {
		this.input.disabled = state;
	}

	render(parent = document.body) {
		parent.appendChild(this.wrapper);
	}
}
