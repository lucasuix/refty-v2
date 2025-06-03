export class Button {
	constructor(text, classes = [], id = 'blank-button', state = false) {
		this.button = document.createElement('button');
		this.button.textContent = text;
		this.button.id = id;
		this.add_classes(classes);

		this.disabled(state);
	}

	add_classes(class_list) {
		this.button.classList.add('btn', 'mt-3', ...class_list);
	}

	disabled(state) {
		this.button.disabled = state;
	}

	render(parent = document.body) {
		parent.appendChild(this.button);
	}
}