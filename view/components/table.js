export class Table {
	constructor(headers = [], classes = [], id = 'blank-table') {
		this.table = document.createElement('table');
		this.table.id = id;
		this.add_classes(classes);

		this.thead = document.createElement('thead');
		this.tbody = document.createElement('tbody');

		this.table.appendChild(this.thead);
		this.table.appendChild(this.tbody);

		this.set_headers(headers);
	}

	add_classes(class_list) {
		this.table.classList.add('table', 'mt-3', ...class_list);
	}

	set_headers(headers) {
		this.thead.innerHTML = ''; // Limpa o thead
		const row = document.createElement('tr');

		headers.forEach(header_text => {
			const th = document.createElement('th');
			th.textContent = header_text;
			row.appendChild(th);
		});

		this.thead.appendChild(row);
	}

	populate(data) {
		data.forEach(row => {
			this.add_row(row);
		});
	}

	add_row(row_data = {}) {
		const row = document.createElement('tr');

		Object.entries(row_data).forEach(([key,value]) => {
			const td = document.createElement('td');
			td.innerHTML = value;
			row.appendChild(td);
		});

		this.tbody.appendChild(row);
	}

	getValue() {
		const rows = this.tbody.querySelectorAll('tr');
		const data = [];

		// Pega os headers
		const headerCells = this.thead.querySelectorAll('th');
		const headers = Array.from(headerCells).map(th => th.textContent.trim());

		// Para cada row
		rows.forEach(tr => {
			const cells = tr.querySelectorAll('td');
			const rowData = {};

			// Associa cada célula com seu header correspondente
			cells.forEach((cell, index) => {
				const header = headers[index] || `Column${index}`;
				rowData[header] = cell.textContent.trim();  // ou cell.innerHTML se preferir pegar HTML
			});

			data.push(rowData);
		});

		return data;
	}


	clear_rows() {
		this.tbody.innerHTML = '';
	}

	render(parent = document.body) {
		parent.appendChild(this.table);
	}
}
