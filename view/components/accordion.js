export class Accordion {

	constructor(id = 'accordionExample') {
		this.container = document.createElement('div');
		this.container.classList.add('accordion', 'mt-3');
		this.container.id = id;

        this.items = {};
	}

    createItem(headerText = 'Título', content) {
        // Cria o item base
        const item = document.createElement('div');
        item.classList.add('accordion-item');

        // Cria o header
        const header = document.createElement('h2');
        header.classList.add('accordion-header');
        header.id = `heading-${Object.entries(this.items).length}`;
        item.appendChild(header);

        // Botão de toggle
        const header_button = document.createElement('button');
        header_button.classList.add('accordion-button', 'collapsed');
        header_button.type = 'button';
        header_button.setAttribute('data-bs-toggle', 'collapse');
        header_button.setAttribute('data-bs-target', `#collapse-${Object.entries(this.items).length}`);
        header_button.setAttribute('aria-expanded', 'false');
        header_button.setAttribute('aria-controls', `collapse-${Object.entries(this.items).length}`);
        header_button.textContent = headerText;
        header.appendChild(header_button);

        // Área de conteúdo (collapsible)
        const collapse = document.createElement('div');
        collapse.id = `collapse-${Object.entries(this.items).length}`;
        collapse.classList.add('accordion-collapse', 'collapse');
        collapse.setAttribute('aria-labelledby', `heading-${Object.entries(this.items).length}`);
        collapse.setAttribute('data-bs-parent', `#${this.container.id}`);

        header.appendChild(collapse);
        collapse.appendChild(content);

        return item;
    }

	addItem(id, titulo, content) {
        this.items[id] = this.createItem(titulo, content);
        this.container.appendChild(this.items[id]);
	}

	clear() {
		this.container.innerHTML = '';
	}

	render(parent = document.body) {
		parent.appendChild(this.container);
	}
}
