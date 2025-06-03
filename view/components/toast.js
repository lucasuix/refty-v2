class Toast {
	constructor(message, classes = [], id = 'blank-toast', autohide = true, delay = 5000) {
		this.toast = document.createElement('div');
		this.toast.classList.add('toast', 'align-items-center', ...classes);
		this.toast.id = id;
		this.toast.setAttribute('role', 'alert');
		this.toast.setAttribute('aria-live', 'assertive');
		this.toast.setAttribute('aria-atomic', 'true');

		this.toastContent = document.createElement('div');
		this.toastContent.classList.add('d-flex');

		this.body = document.createElement('div');
		this.body.classList.add('toast-body');
		this.body.textContent = message;

		this.button = document.createElement('button');
		this.button.type = 'button';
		this.button.classList.add('btn-close', 'me-2', 'm-auto');
		this.button.setAttribute('data-bs-dismiss', 'toast');
		this.button.setAttribute('aria-label', 'Close');

		this.toastContent.appendChild(this.body);
		this.toastContent.appendChild(this.button);
		this.toast.appendChild(this.toastContent);

		this.toastInstance = new bootstrap.Toast(this.toast, { autohide, delay });
		//this.render();
		//this.accuse("Bem Vindo!");
	}

	show() {
		this.toastInstance.show();
	}

	hide() {
		this.toastInstance.hide();
	}

	accuse(message) {
		this.body.textContent = message;
		this.show();
	}

	render(parent = document.body) {
		parent.appendChild(this.toast);
	}
}

export const toast = new Toast('Bem Vindo!', ['bg-primary', 'text-white'], 'my-toast', true, 10000)