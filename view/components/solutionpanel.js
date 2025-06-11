export class SolutionPanel {
	constructor(id = 'ai-solution-field') {
		this.container = document.createElement('div');
		this.container.id = id;
		this.container.classList.add('mt-3', 'bg-dark', 'rounded-3', 'border', 'border-secondary', 'p-3');

		// Título "Melhor Solução"
		const title = document.createElement('h5');
		title.classList.add('mb-2');
		title.textContent = 'Melhor Solução';

		// Parágrafo onde será colocada a melhor solução
		this.bestSolution = document.createElement('p');
		this.bestSolution.id = 'best-solution';

		// Acordeão
		const accordion = document.createElement('div');
		accordion.classList.add('accordion', 'accordion-flush');
		accordion.id = 'accordion-solutions';

		const accordionItem = document.createElement('div');
		accordionItem.classList.add('accordion-item');

		const accordionHeader = document.createElement('h2');
		accordionHeader.classList.add('accordion-header');

		const accordionButton = document.createElement('button');
		accordionButton.classList.add('accordion-button');
		accordionButton.type = 'button';
		accordionButton.setAttribute('data-bs-toggle', 'collapse');
		accordionButton.setAttribute('data-bs-target', '#collapseSolutions');
		accordionButton.setAttribute('aria-expanded', 'true');
		accordionButton.setAttribute('aria-controls', 'collapseSolutions');
		accordionButton.textContent = 'Outras soluções';

		const accordionCollapse = document.createElement('div');
		accordionCollapse.classList.add('accordion-collapse', 'collapse');
		accordionCollapse.id = 'collapseSolutions';

		const accordionBody = document.createElement('div');
		accordionBody.classList.add('accordion-body');

		this.otherSolutionsList = document.createElement('ul');
		this.otherSolutionsList.classList.add('list-group', 'list-group-flush');
		this.otherSolutionsList.id = 'other-solutions';

		// Montagem da estrutura
		accordionBody.appendChild(this.otherSolutionsList);
		accordionCollapse.appendChild(accordionBody);
		accordionHeader.appendChild(accordionButton);
		accordionItem.appendChild(accordionHeader);
		accordionItem.appendChild(accordionCollapse);
		accordion.appendChild(accordionItem);

		this.container.appendChild(title);
		this.container.appendChild(this.bestSolution);
		this.container.appendChild(accordion);
	}

	setValuesFromList(list) {
		this.clearBestSolution();
		this.clearOtherSolutions();

		const [best] = list.shift();
		this.setBestSolution(best);

		list.forEach(([solution]) => {
			this.addOtherSolution(solution);
		});
	}

	setBestSolution(text) {
		this.bestSolution.textContent = text;
	}

	clearBestSolution() {
		this.bestSolution.textContent = '';
	}

	addOtherSolution(text) {
		const li = document.createElement('li');
		li.classList.add('list-group-item');
		li.textContent = text;
		this.otherSolutionsList.appendChild(li);
	}

	clearOtherSolutions() {
		this.otherSolutionsList.innerHTML = '';
	}

	render(parent = document.body) {
		parent.appendChild(this.container);
	}
}
