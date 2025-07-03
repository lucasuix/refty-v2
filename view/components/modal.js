export class Modal {
	constructor({
		title = 'Modal Title',
		message = 'Modal Body',
		id = 'blank-modal',
		buttons = [{ label: 'Close', class: 'btn-secondary', dismiss: true }],
		staticBackdrop = false,
		keyboard = true
	} = {}) {
		this.modal = document.createElement('div');
		this.modal.classList.add('modal', 'fade');
		this.modal.id = id;
		this.modal.setAttribute('tabindex', '-1');
		this.modal.setAttribute('aria-labelledby', `${id}-label`);
		this.modal.setAttribute('aria-hidden', 'true');

		if (staticBackdrop) this.modal.setAttribute('data-bs-backdrop', 'static');
		if (!keyboard) this.modal.setAttribute('data-bs-keyboard', 'false');

		this.dialog = document.createElement('div');
		this.dialog.classList.add('modal-dialog', 'modal-dialog-centered');

		this.content = document.createElement('div');
		this.content.classList.add('modal-content');

		// Header
		this.header = document.createElement('div');
		this.header.classList.add('modal-header');

		this.titleEl = document.createElement('h5');
		this.titleEl.classList.add('modal-title');
		this.titleEl.id = `${id}-label`;
		this.titleEl.textContent = title;

		this.closeBtn = document.createElement('button');
		this.closeBtn.type = 'button';
		this.closeBtn.classList.add('btn-close');
		this.closeBtn.setAttribute('data-bs-dismiss', 'modal');
		this.closeBtn.setAttribute('aria-label', 'Close');

		this.header.appendChild(this.titleEl);
		this.header.appendChild(this.closeBtn);

		// Body
		this.body = document.createElement('div');
		this.body.classList.add('modal-body');
		this.body.textContent = message;

		// Footer
		this.footer = document.createElement('div');
		this.footer.classList.add('modal-footer');

		buttons.forEach(btn => {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = `btn ${btn.class || 'btn-secondary'}`;
			button.textContent = btn.label || 'Close';

			if (btn.dismiss) button.setAttribute('data-bs-dismiss', 'modal');
			if (btn.onClick) button.addEventListener('click', btn.onClick);

			this.footer.appendChild(button);
		});

		this.content.appendChild(this.header);
		this.content.appendChild(this.body);
		this.content.appendChild(this.footer);

		this.dialog.appendChild(this.content);
		this.modal.appendChild(this.dialog);

		this.modalInstance = new bootstrap.Modal(this.modal);
		this.render();
	}

	render(parent = document.body) {
		parent.appendChild(this.modal);
	}

	show() {
		this.modalInstance.show();
	}

	hide() {
		this.modalInstance.hide();
	}

	update({ title, message, buttons }) {
		if (title) this.titleEl.textContent = title;
		if (message) this.body.textContent = message;
		if (buttons) {
			this.footer.innerHTML = '';
			buttons.forEach(btn => {
				const button = document.createElement('button');
				button.type = 'button';
				button.className = `btn ${btn.class || 'btn-secondary'}`;
				button.textContent = btn.label || 'Close';

				if (btn.dismiss) button.setAttribute('data-bs-dismiss', 'modal');
				if (btn.onClick) button.addEventListener('click', btn.onClick);

				this.footer.appendChild(button);
			});
		}
	}
}
